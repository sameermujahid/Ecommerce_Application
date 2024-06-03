import React, { useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const slideIn = keyframes`
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
`;

const slideOut = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const VideoBackground = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Form = styled.form`
  display: ${({ active }) => (active ? 'block' : 'none')};
  animation: ${({ active }) => (active ? slideIn : slideOut)} 0.75s ease;
  background-color:#fff;
  padding:20px;
  border-radius:10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  margin-top: 20px;
`;

const ToggleButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Select = styled.select`
  width: calc(100% - 22px);
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #000;
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #333;
  }
`;

const AuthPage = () => {
  const [loginFormActive, setLoginFormActive] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: '',
    address: '',
    contact_person: '',
    phone: '',
  });
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setLoginFormActive(!loginFormActive);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/user/login/', formData);
      if (res.data && res.data.user && res.data.user.id) {
        const userId = res.data.user.id;
        localStorage.setItem('userId', userId);
        // Redirect to home after successful login
        navigate('/home');
      } else {
        throw new Error('Invalid response structure');
      }
    } catch (err) {
      console.error('Error during login:', err.response ? err.response.data : err.message);
    }
  };
  

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8000/users/create/', formData);
      console.log(res.data); // Handle success
      setRegistrationSuccess(true); // Set registration success to true
    } catch (err) {
      console.error(err.response.data); // Handle error
    }
  };

  return (
    <FormContainer>
      <BackgroundContainer>
        {/* Your video background */}
        <VideoBackground autoPlay loop muted>
          <source src="/My honest reaction.mp4" type="video/mp4" />
        </VideoBackground>  </BackgroundContainer>

        <ToggleButton onClick={toggleForm}>
    {loginFormActive ? 'Switch to Register' : 'Switch to Login'}
  </ToggleButton>
  <Form active={loginFormActive} onSubmit={handleLoginSubmit}>
    <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Username" />
    <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
    <Button type="submit">Login</Button>
  </Form>
  <Form active={!loginFormActive} onSubmit={handleRegisterSubmit}>
    <Input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Name" />
    <Input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
    <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
    <Input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
    <Input type="text" name="contact_person" value={formData.contact_person} onChange={handleChange} placeholder="Contact Person" />
    <Input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
   
    <Button type="submit">Register</Button>
    {registrationSuccess && <p>Registration successful! Please log in.</p>}
  </Form>
  {/* <p>
    {loginFormActive ? "Not registered yet? " : "Already registered? "}
    <Link to={loginFormActive ? "/register" : "/login"}>
      {loginFormActive ? "Register here" : "Login here"}
    </Link>
  </p> */}
</FormContainer>
);
};

export default AuthPage;