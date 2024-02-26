import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFutsalByOwnerId, updateFutsalByOwnerId } from '../services/futsalHelper';
import Bookings from './Bookings';
import CreateSlotComponent from './createSlot';
const AdminFutsalPage: React.FC = () => {
  const [futsalDetails, setFutsalDetails] = useState<any>({});

  useEffect(() => {
    fetchFutsalByOwnerId();
  }, []);

  const fetchFutsalByOwnerId = () => {
    getFutsalByOwnerId()
      .then((data) => {
        setFutsalDetails(data);
        console.log(futsalDetails)
      })
      .catch((error) => {
        console.error('Error fetching futsal details:', error);
        toast.error('Error fetching futsal details');
      });
  };

  // Function to handle image file changes
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Logic to handle file upload (dummy for now)
      console.log('Uploaded file:', file);
    }
  };

  // Function to handle viewing booking requests
  const handleViewBookingRequests = () => {
    // console.log('Viewing booking requests for futsal:', futsalId);
    // Logic to navigate to booking requests page
  };

  // Function to handle updating futsal details
  const handleUpdateFutsal = () => {
    if (!futsalDetails) return;
    updateFutsalByOwnerId( futsalDetails)
      .then(updatedFutsal => {
        setFutsalDetails(updatedFutsal);
        console.log('Futsal details updated successfully:', updatedFutsal);
      })
      .catch(error => {
        console.error('Error updating futsal details:', error);
      });
  };


  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 mt-20 mb-0">
      <h2 className="text-2xl font-semibold text-gray-500 mb-4">Futsal Details Page</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Futsal Details */}
        <div className="lg:flex lg:flex-col lg:space-y-4 dark:bg-gray-800 dark:border-gray-700 rounded-3xl">
          <div className="flex flex-col space-y-2 px-4">
            <label htmlFor="name" className="text-sm text-gray-500 font-medium">Name:</label>
            <input type="text" id="name" name="name" value={futsalDetails.name} onChange={(e) => setFutsalDetails({...futsalDetails, name: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <div className="flex flex-col space-y-2 px-4">
            <label htmlFor="location" className="text-sm text-gray-500 font-medium">Address:</label>
            <input type="text" id="location" name="location" value={futsalDetails.address} onChange={(e) => setFutsalDetails({...futsalDetails, address: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <div className="flex flex-col space-y-2 px-4">
            <label htmlFor="price" className="text-sm text-gray-500 font-medium">Price:</label>
            <input type="text" id="price" name="price" value={futsalDetails.price} onChange={(e) => setFutsalDetails({...futsalDetails, price: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <div className='px-4'>
          <p className="text-sm text-gray-500 ">Upload Owner's QR Code</p>
              <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg bg-gray-200 px-4 py-2" />
            </div>
          {/* Button for Image Upload */}
          <div className='px-4'>
            <p className="text-sm text-gray-500">Upload Futsal Image</p>
            <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <button onClick={handleUpdateFutsal} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Update Futsal</button>

        </div>
        
        {/* Futsal Image & QR Code Upload */}
        <div className="lg:flex lg:flex-col lg:space-y-4">
          {/* Futsal Image */}
          <div className="flex flex-col space-y-4">
            <img src={futsalDetails.image} alt="Futsal Image" className="rounded-lg object-cover h-60 lg:h-80" />
          </div>
          {/* QR Code Upload */}
          <div className="flex flex-col items-center justify-center space-y-4">
        <div className="bg-white rounded-lg flex items-center justify-center">
        <img src={futsalDetails.qr} alt="QR Code" className="rounded-lg object-cover h-40 lg:h-60" />
        </div>
        </div>
        </div>
        </div>
        {/* Bookings component for managing booking requests */}
      <Bookings futsalId={futsalDetails.id} />
      <CreateSlotComponent />

    </div>

      
  );
  
  };  

export default AdminFutsalPage;