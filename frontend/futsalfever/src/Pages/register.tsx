import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Register, RegisterAdmin } from '../services/user-service'; // Update with your service imports

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    fullName: '',
    password: '',
    address: '',
    email: '',
    userType: 'user',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUserTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
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
      })
      .catch((error) => {
        console.log(error);
        console.log('error log');
      });
  };

  return (
    <div>
      <h2>Register Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="userType">User Type:</label>
          <select
          id="userType"
          name="userType"
          value={formData.userType}
          onChange={handleUserTypeChange}
        >
          <option value="user">Customer</option>
          <option value="admin">Futsal Owner</option>
        </select>

        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
