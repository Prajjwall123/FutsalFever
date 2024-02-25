import { useEffect, useState } from "react";
import { getFutsalById } from '../services/futsalHelper';
import NavBar from './Navbar';

const BookingDetail = () => {
  const [paymentImage, setPaymentImage] = useState<File | null>(null);
  const [futsal, setFutsal] = useState<any>(null); // State to hold futsal data
  const [loading, setLoading] = useState<boolean>(true); // State to track loading state
  const path = window.location.pathname;
  const futsalId = parseInt(path.split('/').pop() || ''); // Extract futsal ID from URL path
  console.log(futsalId)

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentImage(file);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  if (!futsal) {
    return <div>Futsal not found</div>; // Handle case when futsal data is not available
  }

  return (
    <div>
      {/* Navigation Bar */}
      <NavBar />
      <section className="container flex flex-col lg:flex-row mx-auto max-w-6xl border-b py-5 lg:py-10">
        {/* Left Side */}
        <div className="lg:w-1/2 lg:flex lg:flex-col">
          {/* Futsal Image */}
          <div className="lg:flex-none">
            <img src={futsal.image} alt={futsal.name} className="w-full h-auto" />
          </div>
          
          {/* Futsal Details */}
          <div className="flex-grow flex flex-col justify-start items-start px-5 py-3 lg:py-0">
            <h2 className="pt-3 text-2xl font-bold">{futsal.name}</h2>
            <p className="font-bold">Address: {futsal.address}</p>
            <p className="font-bold">Price: Rs.{futsal.price}</p>

            {/* Payment Part */}
            <div className="mt-6 lg:mt-0 lg:self-start lg:ml-auto">
              <p className="pb-2 text-xs text-gray-500">Upload Payment Slip Image</p>
              <input type="file" onChange={handleFileUpload} className="border border-gray-300 px-4 py-2 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2">
          {/* QR Code of Owner */}
          <div className="mt-6 lg:mt-0 lg:self-start lg:ml-auto lg:px-5">
            <p className="pb-2 text-xs text-gray-500">Scan QR To Make Payment</p>
            <div className="lg:flex-none">
            <img src={futsal.qr} alt={"qr code"} className="w-20 h-20" />
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingDetail;
