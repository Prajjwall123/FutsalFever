import { useState } from "react";
import NavBar from './Navbar';
const BookingDetail = () => {
  const [paymentImage, setPaymentImage] = useState<File | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPaymentImage(file);
    }
  };

  // Define the futsal object
  const futsal = {
    id: 1,
    name: 'Futsal A',
    image: 'https://english.onlinekhabar.com/wp-content/uploads/2023/02/Futsal-scaled.jpg',
    location: 'Location A',
    price: 20,
    owner: {
      qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Qr-1.svg/220px-Qr-1.svg.png'
    }
  };

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
      <p className="font-bold">Address: {futsal.location}</p>
      <p className="font-bold">Price: ${futsal.price}</p>

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
      <p className="pb-2 text-xs text-gray-500">QR Code of Owner</p>
      <div className="flex items-center gap-4">
        <img src={futsal.owner.qrCode} alt={`QR Code for ${futsal.name}`} />
      </div>
    </div>
  </div>
</section>
</div>
  );
};

export default BookingDetail;
