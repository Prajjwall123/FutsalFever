import QRCode from 'qrcode.react';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bookings from '../components/Bookings';
import NavBar from '../components/Navbar';
import { getFutsalByOwnerId, updateFutsalByOwnerId } from '../services/futsalHelper';
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
    <div className="dashboard bg-white min-h-screen rounded-3xl">
  <NavBar />
  <div className="container mx-auto max-w-6xl px-4 py-8 mt-20 mb-0">
    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Futsal Details Page</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="lg:flex lg:flex-col lg:space-y-4 bg-gray-100 border-gray-200 rounded-3xl">
        <div className="flex flex-col space-y-2 px-4">
          <label htmlFor="name" className="text-sm text-gray-700 font-medium">Name:</label>
          <input type="text" id="name" name="name" value={futsalDetails.name} onChange={(e) => setFutsalDetails({...futsalDetails, name: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
        </div>
        <div className="flex flex-col space-y-2 px-4">
          <label htmlFor="location" className="text-sm text-gray-700 font-medium">Address:</label>
          <input type="text" id="location" name="location" value={futsalDetails.address} onChange={(e) => setFutsalDetails({...futsalDetails, address: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
        </div>
        <div className="flex flex-col space-y-2 px-4">
          <label htmlFor="price" className="text-sm text-gray-700 font-medium">Price:</label>
          <input type="text" id="price" name="price" value={futsalDetails.price} onChange={(e) => setFutsalDetails({...futsalDetails, price: e.target.value})} className="rounded-lg bg-gray-200 px-4 py-2" />
        </div>
        <div className='px-4'>
          <p className="text-sm text-gray-700 ">Upload Owner's QR Code</p>
          <input 
            type="text" 
            value={futsalDetails.ownerQRCode} 
            onChange={(e) => setFutsalDetails({...futsalDetails, ownerQRCode: e.target.value})} 
            className="rounded-lg bg-gray-200 px-4 py-2" 
            placeholder="Enter owner's QR code URL" 
          />
        </div>
        <div className='px-4'>
          <p className="text-sm text-gray-700">Upload Futsal Image</p>
          <input 
            type="text" 
            value={futsalDetails.futsalImage} 
            onChange={(e) => setFutsalDetails({...futsalDetails, futsalImage: e.target.value})} 
            className="rounded-lg bg-gray-200 px-4 py-2" 
            placeholder="Enter futsal image URL" 
          />
        </div>
        <button onClick={handleUpdateFutsal} 
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
          >Update Futsal</button>
      </div>
      <div className="lg:flex lg:flex-col lg:space-y-4">
        <div className="flex flex-col space-y-4">
          <img 
            src={`data:image/jpeg;base64,${futsalDetails.image}`} 
            alt="Futsal Image" 
            className="rounded-lg object-cover h-60 lg:h-80" 
          />
        </div>
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="bg-white rounded-lg flex items-center justify-center">
              <QRCode value={futsalDetails.ownerQRCode} /> {/* Use the number here */}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:col-span-1">
        <Bookings futsalId={futsalDetails.id} />
      </div>
      <div className="lg:col-span-1">
        <CreateSlotComponent futsalId={futsalDetails.id} />
      </div>
    </div>
  </div>
</div>


      
  );
  
  };  

export default AdminFutsalPage;
