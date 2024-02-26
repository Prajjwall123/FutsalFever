import React, { useEffect, useState } from 'react';
import { getFutsalById, updateFutsalByOwnerId } from '../services/futsalHelper';
import CreateSlotComponent from './createSlot';

const FutsalDetailsPage: React.FC = () => {
  // State variables to store futsal details
  const [futsalDetails, setFutsalDetails] = useState<any>(null);

  // Manually set the futsal id to 5 for testing
  const futsalId = 5;

  // Fetch futsal details by ID from the backend API
  useEffect(() => {
    getFutsalById(futsalId)
      .then(data => {
        setFutsalDetails(data); // Update futsal details state with fetched data
      })
      .catch(error => {
        console.error('Error fetching futsal details:', error);
      });
  }, [futsalId]); // Execute only when futsalId changes

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
    console.log('Viewing booking requests for futsal:', futsalId);
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

  if (!futsalDetails) {
    return <div>Loading...</div>; // Render loading indicator while fetching data
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 mt-20">
      <h2 className="text-2xl font-semibold text-gray-500 mb-4">Futsal Details Page</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Futsal Details */}
        <div className="lg:flex lg:flex-col lg:space-y-4 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            <label htmlFor="name" className="text-sm text-gray-500 font-medium">Name:</label>
            <input type="text" id="name" name="name" value={futsalDetails.name} onChange={(e) => setFutsalDetails({...futsalDetails, name: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="location" className="text-sm text-gray-500 font-medium">Address:</label>
            <input type="text" id="location" name="location" value={futsalDetails.address} onChange={(e) => setFutsalDetails({...futsalDetails, address: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="price" className="text-sm text-gray-500 font-medium">Price:</label>
            <input type="text" id="price" name="price" value={futsalDetails.price} onChange={(e) => setFutsalDetails({...futsalDetails, price: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
          {/* Button for Image Upload */}
          <div>
            <p className="text-sm text-gray-500">Upload Futsal Image</p>
            <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg bg-gray-200 px-4 py-2" />
          </div>
        </div>
        {/* Futsal Image & QR Code Upload */}
        <div className="lg:flex lg:flex-col lg:space-y-4">
          {/* Futsal Image */}
          <div className="flex flex-col space-y-4">
            <img src={futsalDetails.image} alt="Futsal Image" className="rounded-lg object-cover h-60 lg:h-80" />
          </div>
          {/* QR Code Upload */}
          <div className="flex flex-col space-y-4">
            {/* <img src={futsalDetails.qr} alt="QR Code" className="rounded-lg object-cover h-60 lg:h-80" /> */}
            <div className="flex justify-start items-center">
              <label htmlFor="qrCode" className="text-sm text-gray-500 font-medium">Upload Owner's QR Code</label>
              <input type="file" accept="image/*" onChange={handleImageChange} className="rounded-lg bg-gray-200 px-4 py-2" />
            </div>
          </div>
          {/* Button for QR Code Upload */}
          <button onClick={handleUpdateFutsal} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">Update Futsal</button>
        </div>
        <CreateSlotComponent futsalId={futsalId} />

      </div>
    </div>
  );
  
};

export default FutsalDetailsPage;
