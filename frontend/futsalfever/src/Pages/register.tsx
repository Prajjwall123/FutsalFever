import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Register, RegisterAdmin } from '../services/user-service';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    password: '',
    address: '',
    email: '',
    userType: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    // Validation checks
    if (!formData.userName || !formData.fullName || !formData.password || !formData.address || !formData.email) {
      toast.error('Please fill in all fields');
      return;
    }
  
    if (formData.password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
  
    if (!formData.email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }
  
    const registerService = formData.userType === 'admin' ? RegisterAdmin : Register;
    const payload = formData.userType === 'admin' ? { ...formData, isAdmin: true } : formData;
  
    registerService(payload)
      .then((resp) => {
        console.log(resp);
        console.log('success log');
        toast.success('Registered Successfully');
  
        Login({ email: formData.email, password: formData.password })
          .then((jwtTokenData) => {
            console.log('User logged in: ', jwtTokenData);
            if (formData.userType === 'admin') {
              navigate('/futsal_creation');
              window.location.reload();
            } else {
              navigate('/login');
            }
          })
          .catch((error) => {
            console.log(error);
            toast.error('Error logging in after registration');
          });
      })
      .catch((error) => {
        console.log(error);
        console.log('error log');
      });
  };
  
  

  return (
    <div className="w-11/12 max-w-[700px] px-10 py-20 rounded-3xl bg-white border-2 border-gray-300 mx-auto mt-20 shadow-lg">
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-semibold text-gray-800">Register Page</h1>
      <p className="font-medium text-lg text-gray-600 mt-4">Please enter your details.</p>
  
      <form onSubmit={handleSubmit} className="mt-8 w-full">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-600" htmlFor="userName">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Full Name */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Password */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Address */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* Email */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          />
        </div>
  
        {/* User Type */}
        <div className="flex flex-col mt-4">
          <label className="text-lg font-medium text-gray-600" htmlFor="userType">
            I am a
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className="w-full border-2 border-gray-300 rounded-xl p-4 mt-1 focus:outline-none focus:border-blue-500"
          >
            <option value="user">Customer</option>
            <option value="admin">Futsal Owner</option>
          </select>
        </div>
  
        {/* Submit Button */}
        <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 mt-5"
        >
          Register
        </button>
      </div>
      </form>
  
      <div className="flex justify-center items-center mt-5">
        <p className="font-medium text-base text-gray-600">Already Have An Account?</p>
        <a href="/login" className="ml-2 font-medium text-base text-gray-700">Sign in</a>
      </div>
    </div>
  </div>
  
    );
    }

export default RegisterPage;
