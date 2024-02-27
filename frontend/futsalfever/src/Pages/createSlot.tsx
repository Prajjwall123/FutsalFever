import { useState } from 'react';
import { createSlot } from '../services/futsalHelper';

const CreateSlotComponent = ({ futsalId }: { futsalId: number }) => {
  // Define state for slot data, loading state, and error state
  const [slotData, setSlotData] = useState({
      startTime: '',
      endTime: '',
      booked: false,
      futsalId: -1, // Default value until futsalId is determined

    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Handle changes in input fields
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
      const { name, value } = e.target;
      console.log("new place adding futsal id:"+futsalId)
      setSlotData({ ...slotData, [name]: value, futsalId: futsalId });
  };
  

    // Handle form submission
    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true); // Set loading to true while making the request
        setError(null); // Reset error state

        try {
            // Attempt to create the slot using the provided data
            console.log('Slot data:', slotData);
            const createdSlot = await createSlot(slotData);
            console.log('Slot created successfully:', createdSlot);
            // Reset form fields or handle success message
        } catch (error) {
            console.error('Error creating slot:', error);
            setError('Failed to create slot. Please try again later.');
        } finally {
            setLoading(false); // Set loading back to false after request completes
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
                    {loading ? 'Creating Slot...' : 'Create Slot'}
                </button>
                
                {/* Display error message if there's an error */}
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default CreateSlotComponent;
