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
    <div>
      <h2>Futsal Slots</h2>
      <table>
        <thead>
          <tr>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {futsalSlots.map((slot) => (
            <tr key={slot.id}>
              <td>{slot.startTime}</td>
              <td>{slot.endTime}</td>
              <td>{slot.bookedStatus ? 'Booked' : 'Not Booked'}</td>
              <td>
                {!slot.bookedStatus && (
                  <button onClick={() => handleSlotSelection(slot.id)}>Select</button>
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
