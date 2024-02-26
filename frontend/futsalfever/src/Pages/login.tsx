import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '../services/user-service';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = event.target;
    setCredentials({
      ...credentials,
      [field]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(credentials);
    // Validation
    if (!credentials.email || !credentials.password) {
      toast.error('Fill in all fields');
      return;
    }

// Submitting to server
Login(credentials)
  .then((jwtTokenData) => {
    console.log('User logged in: ', jwtTokenData);
    // Check the role from the JWT token data
    const role = jwtTokenData.role;
    console.log("the role is"+role)
    // Redirect to dashboard or user page based on role
    if (role === 'admin') {
      // Redirect admin to admin dashboard
      navigate('/admin');
    } else {
      // Redirect regular user to user dashboard
      navigate('/');
    }
  })
  .catch((error) => {
    console.log(error);
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Something went wrong !!');
    }
  });
  };

  const handleReset = () => {
    setCredentials({
      email: '',
      password: '',
    });
  };

  return (
      <div className='w-11/12 max-w-[700px] px-10 py-20 rounded-3xl dark:bg-gray-800 dark:border-gray-700 border-2 border-gray-700 mx-auto mt-20'>
        <h1 className='text-5xl font-semibold text-white'>Welcome Back</h1>
        <p className='font-medium text-lg text-gray-300 mt-4'>Welcome back! Please enter your details.</p>

        <div className='mt-8'>
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className='flex flex-col'>
              <label className='text-lg font-medium text-gray-300'>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={credentials.email}
                onChange={(e) => handleChange(e, 'email')}
                className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your email" />
            </div>
            {/* Password */}
            <div className='flex flex-col mt-4'>
              <label className='text-lg font-medium text-gray-300'>Password</label>
              <input
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) => handleChange(e, 'password')}
                className='w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent'
                placeholder="Enter your password"
                type="password" />
            </div>

            {/* Sign in */}
            <div className='mt-8'>
              <button type="submit" className='active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01]  ease-in-out transform py-4 bg-violet-500 rounded-xl text-white font-bold text-lg'>
                Sign in
              </button>
            </div>
          </form>

          {/* No account */}
          <div className='mt-8 flex justify-center items-center'>
            <p className='font-medium text-base text-gray-300'>Don't have an account?</p>
            <Link to="/register" className='ml-2 font-medium text-base text-violet-500'>Sign up</Link>
          </div>
        </div>
      </div>

  );
};

export default LoginPage;
