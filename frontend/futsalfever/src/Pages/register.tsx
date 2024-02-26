import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login, Register, RegisterAdmin } from '../services/user-service'; // Update with your service imports

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
    const registerService = formData.userType === 'admin' ? RegisterAdmin : Register;

    registerService(formData)
      .then((resp) => {
        console.log(resp);
        console.log('success log');
        toast.success('Registered Successfully');

        // Log in the user immediately after successful registration
        Login({ email: formData.email, password: formData.password })
          .then((jwtTokenData) => {
            console.log('User logged in: ', jwtTokenData);
            // Redirect to appropriate page based on user type
            if (formData.userType === 'admin') {
              navigate('/futsal_creation');
            } else {
              navigate('/login'); // Redirect to login if user is not admin
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
<div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl dark:bg-gray-800 dark:border-gray-700 border-2 border-gray-700 mx-auto mt-20'>
      <h1 className='text-5xl font-semibold text-white'>Register Page</h1>
      <p className='font-medium text-lg text-gray-300 mt-4'>Please enter your details.</p>

      <form onSubmit={handleSubmit} className='mt-8'>
        {/* User Name */}
        <div className='flex flex-col'>
          <label className='text-lg font-medium text-gray-300' htmlFor="userName">User Name</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          />
        </div>
        {/* Full Name */}
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium text-gray-300' htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          />
        </div>
        {/* Password */}
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium text-gray-300' htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          />
        </div>
        {/* Address */}
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium text-gray-300' htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          />
        </div>
        {/* Email */}
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium text-gray-300' htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          />
        </div>
        {/* User Type */}
        <div className='flex flex-col mt-4'>
          <label className='text-lg font-medium text-gray-300' htmlFor="userType">User Type</label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleChange}
            className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
          >
            <option value="user">Customer</option>
            <option value="admin">Futsal Owner</option>
          </select>
        </div>
        {/* Submit Button */}
        <div className='mt-8'>
          <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default RegisterPage;
