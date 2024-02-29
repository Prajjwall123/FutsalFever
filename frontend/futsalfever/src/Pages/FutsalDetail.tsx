import QRCode from 'qrcode.react';
import React, { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import FutsalSlotsComponent from '../components/FutsalSlots';
import NavBar from '../components/Navbar';
import { getFutsalById, requestBooking } from '../services/futsalHelper';


const BookingDetail = () => {
  const [futsal, setFutsal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [paymentInput, setPaymentInput] = useState<string>('');
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const path = window.location.pathname;
  const futsalId = parseInt(path.split('/').pop() || '');
  const [qrData, setQRData] = useState<string>('');

  useEffect(() => {
    getFutsalById(futsalId)
      .then(data => {
        setFutsal(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching futsal:', error);
        setLoading(false);
      });
  }, [futsalId]);

  const handlePaymentInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentInput(event.target.value);
  };

  const handleRequestBooking = async () => {
    try {
        if (!selectedSlotId) {
            console.error('Slot selection is missing.');
            toast('Please select a slot before requesting booking.');
            return;
        }

        if (!paymentInput) {
            console.error('Payment slip is missing.');
            toast('Please upload the payment slip before requesting booking.');
            return;
        }

        const bookingData = {
            slotId: selectedSlotId,
            paymentImage: paymentInput,
            futsal_id: futsalId
        };

        const response = await requestBooking(bookingData);
        console.log('Booking requested successfully:', response);
        alert('Booking request successful.');

        setPaymentInput('');
        setSelectedSlotId(null);
    } catch (error) {
        console.error('Error requesting booking:', error);
        alert('An error occurred while requesting booking. Please try again.');
    }
};


  return (
    <div>
      <NavBar />
      
      <section className="container mx-auto max-w-6xl pt-20 pb-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">{futsal?.name}</h1>

        <section className="bg-gray-200 rounded-lg shadow-md mx-auto px-8 py-6 flex items-center justify-between">
  <div className="w-1/3">
    <img
      src={`data:image/jpeg;base64,${futsal?.image}`}
      alt={futsal?.name}
      className="rounded-lg h-auto lg:h-64 object-cover"
    />
  </div>

  <div className="w-2/3 ml-8 flex flex-col">

    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{futsal?.name}</h2>


    <div className="flex justify-between">
      <div className="text-gray-600 text-lg">
        <span className="font-bold">Address:</span> {futsal?.address}
      </div>
    </div>

    

    <div className="text-gray-600 text-lg mt-auto">
      <span className="font-bold">Price:</span> Rs. {futsal?.price}
    </div>
  </div>
</section>


        <FutsalSlotsComponent futsalId={futsalId} onSlotSelect={(slotId) => setSelectedSlotId(slotId)} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-10">
          <div className="bg-gray-200 rounded-lg shadow-md px-4 py-4">
            <p className="pb-2 text-sm text-gray-700">Enter Payment Slip Path</p>
            <input type="text" value={paymentInput} onChange={handlePaymentInputChange} className="rounded-lg bg-gray-100 px-4 py-2" />
            <button onClick={handleRequestBooking} className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300">
              Request Booking
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-200 rounded-lg shadow-md px-4 py-6">
            <p className="pb-2 text-sm text-gray-700 text-center">Scan QR to make payment</p>
            <div className="flex flex-col items-center justify-center space-y-4">
              {futsal?.qr && (
                <div className="bg-white rounded-lg flex items-center justify-center">
                  <QRCode value={futsal.qr} />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetail;
