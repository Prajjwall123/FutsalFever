import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo2.png';
import { checkAdminStatus } from '../services/futsalHelper';
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
    
    if (!credentials.email || !credentials.password) {
      toast.error('Please fill in all fields');
      return;
    }

    Login(credentials)
  .then((jwtTokenData) => {
    console.log('User logged in: ', jwtTokenData);
    
    // Check admin status asynchronously
    checkAdminStatus()
      .then((isAdmin) => {
        if (isAdmin) {
          navigate('/admin');
          window.location.reload();
        } else {
          navigate('/');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Error checking admin status:', error);
        // Handle error if needed
      });
  })
  .catch((error) => {
    console.error(error);
    if (error.response && (error.response.status === 400 || error.response.status === 404)) {
      toast.error(error.response.data.message);
    } else {
      toast.error('Invalid login credentials');
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
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
    <div className="flex items-center justify-center mb-8">
      <img className="h-16 w-16 mr-4" src={Logo} alt="Logo" />
      <div className="text-2xl font-bold text-gray-900">FutsalFever</div>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={credentials.email}
          onChange={(e) => handleChange(e, "email")}
          className="w-full border rounded-lg p-3 mt-1 bg-gray-50"
          placeholder="Enter your email"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700">Password</label>
        <input
          id="password"
          name="password"
          value={credentials.password}
          onChange={(e) => handleChange(e, "password")}
          className="w-full border rounded-lg p-3 mt-1 bg-gray-50"
          placeholder="Enter your password"
          type="password"
        />
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-gray-900 border border-transparent rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-blue-300"
        >
          Sign in
        </button>
      </div>
    </form>

    <div className="flex justify-center items-center mt-4">
      <p className="text-sm text-gray-700">Don't have an account? </p>
      <Link to="/register" className="ml-1 text-sm font-medium text-gray-900">
        Sign up
      </Link>
    </div>
  </div>
</div>

  );
};

export default LoginPage;
