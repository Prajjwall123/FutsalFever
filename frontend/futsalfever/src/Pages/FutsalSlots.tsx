import React, { useEffect, useState } from 'react';
import { getFutsalSlotsByFutsalId } from '../services/futsalHelper';

// Define the interface for Futsal Slot
interface FutsalSlot {
  id: number;
  startTime: string;
  endTime: string;
  bookedStatus: boolean;
}

interface FutsalSlotsComponentProps {
  futsalId: number;
  onSlotSelect: (slotId: number) => void; // Callback function to handle slot selection
  
}

const FutsalSlotsComponent: React.FC<FutsalSlotsComponentProps> = ({ futsalId, onSlotSelect }) => {
  const [futsalSlots, setFutsalSlots] = useState<FutsalSlot[]>([]); // Specify the type
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFutsalSlots = async () => {
      setLoading(true);
      try {
        console.log(futsalId)
        const slotsData = await getFutsalSlotsByFutsalId(futsalId);
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
    // Pass the selected slot ID to the parent component
    onSlotSelect(slotId);
    console.log(slotId+":slotid")
  };

  if (loading) {
    return <div>Loading futsal slots...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
<div className="container mx-auto max-w-sm px-4 py-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Futsal Slots</h2>

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
                className="rounded-lg bg-blue-500 text-white px-4 py-1 hover:bg-blue-700"
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
