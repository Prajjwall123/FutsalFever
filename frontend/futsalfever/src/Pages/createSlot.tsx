import { useState } from 'react';
import { toast } from 'react-toastify';
import { createSlot } from '../services/futsalHelper';

const CreateSlotComponent = ({ futsalId }: { futsalId: number }) => {
    const [slotData, setSlotData] = useState({
        startTime: '',
        endTime: '',
        booked: false,
        futsalId: -1,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: { target: { name: any; value: any; }; }) => {
        const { name, value } = e.target;
        setSlotData({ ...slotData, [name]: value, futsalId: futsalId });
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const createdSlot = await createSlot(slotData);
            console.log('Slot created successfully:', createdSlot);
            toast("Slot created successfully")
        } catch (error) {
            console.error('Error creating slot:', error);
            toast("Failed to create slot")
            setError('Failed to create slot. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-sm px-4 py-8 bg-white">
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

                <button type="submit" 
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
          >
                    {loading ? 'Creating Slot...' : 'Create Slot'}
                </button>
                
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default CreateSlotComponent;
