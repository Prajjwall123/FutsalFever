import React, { useEffect, useState } from 'react';
import { getFutsalById, updateFutsalById } from '../services/futsalHelper';

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
    updateFutsalById(futsalId, futsalDetails)
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
    <div>
      <h2>Futsal Details Page</h2>
      <div>
        <img src={futsalDetails.image} alt="Futsal Image" style={{ maxWidth: '200px', marginBottom: '10px' }} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={futsalDetails.name} onChange={(e) => setFutsalDetails({...futsalDetails, name: e.target.value})} />
      </div>
      <div>
        <label htmlFor="location">Address:</label>
        <input type="text" id="location" name="location" value={futsalDetails.address} onChange={(e) => setFutsalDetails({...futsalDetails, address: e.target.value})} />
      </div>
      <div>
        <label htmlFor="price">Price:</label>
        <input type="text" id="price" name="price" value={futsalDetails.price} onChange={(e) => setFutsalDetails({...futsalDetails, price: e.target.value})} />
      </div>
      <div>
        <img src={futsalDetails.qr} alt="Owner's QR Code" style={{ maxWidth: '200px', marginBottom: '10px' }} />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <button onClick={handleUpdateFutsal}>Update Futsal</button>
      <button onClick={handleViewBookingRequests}>View Booking Requests</button>
    </div>
  );
};

export default FutsalDetailsPage;
