import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import FutsalSlotsComponent from '../components/FutsalSlots';
import NavBar from '../components/Navbar';
import { getFutsalById, getVerifiedBookingsByUserId, requestBooking } from '../services/futsalHelper';

const BookingDetail = () => {
  const [futsal, setFutsal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const path = window.location.pathname;
  const futsalId = parseInt(path.split('/').pop() || '');
  const [qrData, setQRData] = useState<string>('');
  const [paymentInput, setPaymentInput] = useState<File | null>(null);
  const [hasAcceptedBooking, setHasAcceptedBooking] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);


  useEffect(() => {
    getVerifiedBookingsByUserId()
      .then((verifiedBookings) => {
        // Check if any verified booking has been accepted by this futsal
        const acceptedBooking = verifiedBookings.find((booking: any) => booking.slot.futsal.id === futsalId);

        if (acceptedBooking) {
          setHasAcceptedBooking(true);

          // Display a toast with the name of the futsal that accepted the booking
          const acceptedFutsalName = acceptedBooking.slot.futsal.name;
          toast.success(`Booking accepted by ${acceptedFutsalName}`, {
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching verified bookings:', error);
      });

    // Fetch futsal details if the user is logged in
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
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setPaymentInput(file);
    } else {
      console.error('No file selected.');
    }
  };

  const handleRequestBooking = async () => {
    try {
      const hasToken = localStorage.getItem('token');
      console.log(hasToken)

      if (!hasToken) {
        alert('Please login to book the futsal');
        return;
      }
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
            file: paymentInput,
            futsal_id: futsalId
        };

        const response = await requestBooking(bookingData);
        console.log('Booking requested successfully:', response);
        alert('Booking request successful.');

        setPaymentInput(null);
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
            <p className="pb-2 text-sm text-gray-700">Upload payment slip</p>
            <input type="file" onChange={handlePaymentInputChange} className="rounded-lg bg-gray-100 px-4 py-2" />
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
