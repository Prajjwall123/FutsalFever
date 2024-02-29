import React, { useEffect, useState } from 'react';
import { getFutsalSlotsByFutsalIdPending } from '../services/futsalHelper';

interface FutsalSlot {
  id: number;
  startTime: string;
  endTime: string;
  bookedStatus: boolean;
}

interface FutsalSlotsComponentProps {
  futsalId: number;
  onSlotSelect: (slotId: number) => void;
}

const FutsalSlotsComponent: React.FC<FutsalSlotsComponentProps> = ({ futsalId, onSlotSelect }) => {
  const [futsalSlots, setFutsalSlots] = useState<FutsalSlot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFutsalSlots = async () => {
      setLoading(true);
      try {
        const slotsData = await getFutsalSlotsByFutsalIdPending(futsalId);
        setFutsalSlots(slotsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching futsal slots:', error);
        setError('Error fetching futsal slots. Please try again later.');
        setLoading(false);
      }
    };

    fetchFutsalSlots();
  }, [futsalId]);

  const handleSlotSelection = (slotId: number) => {
    onSlotSelect(slotId);
  };

  if (loading) {
    return <div>Loading futsal slots...</div>;
  }

  if (error) {
    return <div className='text-center mt-5'>Oops! No Slots Available For This Futsal</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-8 py-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Available Slots</h2>
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium">
            <th className="px-4 py-2">Start Time</th>
            <th className="px-4 py-2">End Time</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {futsalSlots.map((slot) => (
            <tr key={slot.id} className="border-b border-gray-200">
              <td className="px-4 py-2">{slot.startTime}</td>
              <td className="px-4 py-2">{slot.endTime}</td>
              <td className="px-4 py-2 text-gray-500">
                {slot.bookedStatus ? 'Booked' : 'Not Booked'}
              </td>
              <td className="px-4 py-2">
                {!slot.bookedStatus && (
                  <button
                  className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
                  onClick={() => handleSlotSelection(slot.id)}
                  >
                    Select
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FutsalSlotsComponent;
