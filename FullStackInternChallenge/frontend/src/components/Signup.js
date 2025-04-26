import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('Sending signup request:', { name, email, password, address }); // Log the payload
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/user/signup`, { name, email, password, address });
      console.log('Signup response:', res.data); // Log the response
      login(res.data.user, res.data.token);
      history.push('/user');
    } catch (error) {
      console.error('Signup error:', error.message, error.response?.data); // Log detailed error
      const errorMessage = error.response?.data?.message || JSON.stringify(error.response?.data) || error.message;
      alert('Signup failed: ' + errorMessage);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name (20-60 chars)" required />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8-16 chars, 1 upper, 1 special)" required />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address (max 400 chars)" required />
        <button type="submit">Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;