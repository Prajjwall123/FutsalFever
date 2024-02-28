import QRCode from 'qrcode.react';
import React, { useEffect, useState } from "react";
import { getFutsalById, requestBooking } from '../services/futsalHelper';
import FutsalSlotsComponent from './FutsalSlots';
import NavBar from './Navbar';

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
      if (!paymentInput || !selectedSlotId) {
        console.error('Payment input or selected slot ID is missing.');
        return;
      }
  
      const bookingData = {
        slotId: selectedSlotId,
        paymentImage: paymentInput,
        futsal_id: futsalId
      };

      const response = await requestBooking(bookingData);
      console.log('Booking requested successfully:', response);

      setPaymentInput('');
      setSelectedSlotId(null);
    } catch (error) {
      console.error('Error requesting booking:', error);
    }
  };

  return (
    <div>
      <NavBar />
      
      <section className="container mx-auto max-w-6xl pt-20 pb-10">
        <h1 className="text-3xl font-bold text-gray-50 text-center mb-8">Futsal Booking System</h1>

        <section className="bg-gray-900 text-white rounded-lg shadow-md mx-auto px-8 py-6 flex flex-col items-center">
          <img
            src={`data:image/jpeg;base64,${futsal?.image}`}
            alt={futsal?.name}
            className="rounded-lg h-auto lg:h-48 object-cover mb-4"
          />

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
