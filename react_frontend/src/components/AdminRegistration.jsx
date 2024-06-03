import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Clothes = styled.div`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translateX(-50%);
  animation: fall 2s linear infinite;

  @keyframes fall {
    0% {
      top: -100px;
    }
    100% {
      top: 100vh;
    }
  }
`;

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    address: '',
    contact_person: '',
    phone: '',
    user_type: '' // Assuming user_type is a select dropdown
  });

  const { name, username, email, password, address, contact_person, phone, user_type } = formData;

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/users/create/', formData);
      console.log(res.data); // Handle success
    } catch (err) {
      console.error(err.response.data); // Handle error
    }
  };

  return (
    <RegisterContainer>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="username" value={username} onChange={handleChange} placeholder="Username" />
        <input type="email" name="email" value={email} onChange={handleChange} placeholder="Email" />
        <input type="password" name="password" value={password} onChange={handleChange} placeholder="Password" />
        <input type="text" name="address" value={address} onChange={handleChange} placeholder="Address" />
        <input type="text" name="contact_person" value={contact_person} onChange={handleChange} placeholder="Contact Person" />
        <input type="text" name="phone" value={phone} onChange={handleChange} placeholder="Phone" />
        <select name="user_type" value={user_type} onChange={handleChange}>
          <option value="">Select User Type</option>
          <option value="supplier">Supplier</option>
          <option value="customer">Customer</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/admin/login">Click here to login</Link></p>
      <Clothes>👚👕👖👔👗</Clothes>
    </RegisterContainer>
  );
};

export default Register;
