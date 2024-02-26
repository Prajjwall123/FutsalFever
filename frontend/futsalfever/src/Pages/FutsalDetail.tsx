import React, { useEffect, useState } from "react";
import { getFutsalById, requestBooking } from '../services/futsalHelper';
import FutsalSlotsComponent from './FutsalSlots'; // Import the FutsalSlotsComponent
import NavBar from './Navbar';
import './bookingdetails.css';

const BookingDetail = () => {
  const [paymentImagePath, setPaymentImagePath] = useState<string>('');
  const [futsal, setFutsal] = useState<any>(null); // State to hold futsal data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state
  const [paymentInput, setPaymentInput] = useState<string>(''); // State to hold the payment input
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null); // State to hold the selected slot ID
  const path = window.location.pathname;
  const futsalId = parseInt(path.split('/').pop() || ''); // Extract futsal ID from URL path

  useEffect(() => {
    // Fetch futsal data from the backend
    getFutsalById(futsalId)
      .then(data => {
        setFutsal(data); // Set futsal data to state
        setLoading(false); // Update loading state
      })
      .catch(error => {
        console.error('Error fetching futsal:', error);
        setLoading(false); // Update loading state in case of error
      });
  }, [futsalId]); // Execute only when futsalId changes

  const handlePaymentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInput(event.target.value);
  };

  const handleRequestBooking = async () => {
    try {
      // Ensure that paymentInput and selectedSlotId are available
      if (!paymentInput || !selectedSlotId) {
        console.error('Payment input or selected slot ID is missing.');
        return;
      }
  
    // Prepare the booking data
    const bookingData = {
      slotId: selectedSlotId, // Selected slot ID
      paymentImage: paymentInput,// Assuming paymentInput holds the payment image string
      futsal_id:futsalId

    };

    // console.log('userId:', bookingData.userId);
    console.log('slotId:', bookingData.slotId);
    console.log('paymentImage:', bookingData.paymentImage);
  
      // Request the booking
      const response = await requestBooking(bookingData);
      console.log('Booking requested successfully:', response);
  
      // Clear the payment input and selected slot ID after booking request
      setPaymentInput('');
      setSelectedSlotId(null);
    } catch (error) {
      console.error('Error requesting booking:', error);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />
      
      <section className="container mx-auto max-w-6xl pt-20 pb-10">
        <h1 className="text-3xl font-bold text-gray-50 text-center mb-8">Futsal Booking System</h1>

        <section className="bg-gray-900 text-white rounded-lg shadow-md mx-auto px-8 py-6 flex flex-col items-center">
          <img src={futsal?.image} alt={futsal?.name} className="rounded-lg h-auto lg:h-48 object-cover mb-4" />
          <h2 className="text-2xl font-semibold text-gray-50">{futsal?.name}</h2>
          <div className="flex flex-row items-center justify-between text-gray-400 text-base">
            <p>
              <span className="font-bold">Address:</span> {futsal?.address}
            </p>
            <p>
              <span className="font-bold">Price:</span> Rs. {futsal?.price}
            </p>
          </div>
        </section>

        {/* Display Futsal SlotsComponent with futsalId as prop */}
        <FutsalSlotsComponent futsalId={futsalId} onSlotSelect={(slotId) => setSelectedSlotId(slotId)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
          <div className="bg-gray-800 rounded-lg shadow-md px-4 py-4">
            <p className="pb-2 text-sm text-gray-400">Enter Payment Slip Path</p>
            <input type="text" value={paymentInput} onChange={handlePaymentInputChange} className="rounded-lg bg-gray-700 px-4 py-2" />
            <button onClick={handleRequestBooking} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Request Booking
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-md px-4 py-6">
            <p className="pb-2 text-sm text-gray-400 text-center">Scan QR to make payment</p>
            <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-white rounded-lg flex items-center justify-center">
        <img src={futsal?.qr} alt="QR Code" className="rounded-lg object-cover h-40 lg:h-60" />
        </div>
        </div>
        </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetail;
