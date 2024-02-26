import { useState } from 'react';
import { createSlot } from '../services/futsalHelper';

const CreateSlotComponent = ({ futsalId }: { futsalId: number }) => {
    console.log(futsalId)
    const [slotData, setSlotData] = useState({
        startTime: '',
        endTime: '',
        booked: false,
        futsalId:11
    });
    

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setSlotData({ ...slotData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const createdSlot = await createSlot(slotData);
      console.log('Slot created successfully:', createdSlot);
      // Reset form fields or handle success message
    } catch (error) {
      console.error('Error creating slot:', error);
      // Handle error - perhaps show an error message to the user
    }
  };

  return (
    <div>
      <h2>Create Slot</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="startTime">Start Time:</label>
          <input type="text" id="startTime" name="startTime" value={slotData.startTime} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="endTime">End Time:</label>
          <input type="text" id="endTime" name="endTime" value={slotData.endTime} onChange={handleChange} />
        </div>
        {/* Add other input fields for slot data */}
        <button type="submit">Create Slot</button>
      </form>
    </div>
  );
};

export default CreateSlotComponent;
