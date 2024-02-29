import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createFutsal } from '../services/futsalHelper';


interface FutsalData {
  name: string;
  address: string;
  file: File | null;
  qr: string;
  price: number;
}

const CreateFutsalForm: React.FC = () => {
  const navigate = useNavigate();
  const [futsalData, setFutsalData] = useState<FutsalData>({
    name: '',
    address: '',
    file: null,
    qr: '',
    price: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFutsalData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFutsalData(prevData => ({
      ...prevData,
      file: file || null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(futsalData)
      await createFutsal(futsalData);
      toast("Futsal created successfully")
      // navigate("/admin")
    } catch (error) {
      toast("Futsal not created")
    }
  };

  return (
    <div className="container bg-white rounded-3xl mx-auto max-w-sm px-4 py-8 mt-20">
      <h2 className="text-2xl text-gray-900 font-semibold mb-4">Create Futsal</h2>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm text-gray-500 font-medium">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={futsalData.name}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="address" className="text-sm text-gray-500 font-medium">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={futsalData.address}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="file" className="text-sm text-gray-500 font-medium">
            Image:
          </label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleImageChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="qr" className="text-sm text-gray-500 font-medium">
            QR Code:
          </label>
          <input
            type="text"
            id="qr"
            name="qr"
            value={futsalData.qr}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="price" className="text-sm text-gray-500 font-medium">
            Price:
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={futsalData.price}
            onChange={handleChange}
            className="rounded-lg bg-gray-200 px-4 py-2"
          />
        </div>

        <div className="justify-content-center">
          <button type="submit" className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-700">
            Create Futsal
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateFutsalForm;
