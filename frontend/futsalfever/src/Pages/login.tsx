import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Login } from '../services/user-service';
import Logo from './logo-2.svg';


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
    <div
  className="w-11/12 max-w-[400px] max-h-[600px] px-10 py-10 rounded-3xl dark:bg-gray-800 dark:border-gray-700 border-2 border-gray-700 mx-auto mt-20"
>
  <div className="flex flex-col items-center justify-center">
    {/* Logo and title */}
    <div className="flex items-center justify-center mb-8">
      <div className="flex-shrink-0">
        <img className="h-10 w-10" src={Logo} alt="Logo" />
      </div>
      <div className="ml-2 text-lg font-bold text-white text-center">FutsalFever</div>
    </div>

    {/* Login form and no account section */}
    <div className="flex flex-col space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-300">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={credentials.email}
            onChange={(e) => handleChange(e, "email")}
            className="w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent placeholder:text-gray-400"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label className="text-lg font-medium text-gray-300">Password</label>
          <input
            id="password"
            name="password"
            value={credentials.password}
            onChange={(e) => handleChange(e, "password")}
            className="w-full border-2 border-gray-700 rounded-xl p-4 mt-1 bg-transparent placeholder:text-gray-400"
            placeholder="Enter your password"
            type="password"
          />
        </div>

        {/* Sign in */}
        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="rounded-lg bg-blue-500 text-white px-4 py-2 hover:bg-blue-700"
          >
            Sign in
          </button>
        </div>
      </form>

      {/* No account */}
      <div className="flex justify-center items-center">
        <p className="font-medium text-base text-gray-300">Don't have an account?</p>
        <Link to="/register" className="ml-2 font-medium text-base text-blue-700">
          Sign up
        </Link>
      </div>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
