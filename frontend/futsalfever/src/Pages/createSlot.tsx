import { useState } from 'react';
import { createSlot } from '../services/futsalHelper';

const CreateSlotComponent = ({ futsalId }: { futsalId: number }) => {
    console.log(futsalId)
    
    const [slotData, setSlotData] = useState({
        startTime: '',
        endTime: '',
        booked: true,
        futsalId:13
        
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
<div className="container mx-auto max-w-sm px-4 py-8">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800">Create Slot</h2>

  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="flex flex-col space-y-2">
      <label htmlFor="startTime" className="text-sm text-gray-500 font-medium">Start Time:</label>
      <input
        type="text"
        id="startTime"
        name="startTime"
        value={slotData.startTime}
        onChange={handleChange}
        className="rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>

    <div className="flex flex-col space-y-2">
      <label htmlFor="endTime" className="text-sm text-gray-500 font-medium">End Time:</label>
      <input
        type="text"
        id="endTime"
        name="endTime"
        value={slotData.endTime}
        onChange={handleChange}
        className="rounded-lg bg-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      />
    </div>

    <button type="submit" className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-700">
      Create Slot
    </button>
  </form>
</div>

  );
};

export default CreateSlotComponent;
