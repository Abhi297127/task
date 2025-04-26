import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const StoreOwnerDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [data, setData] = useState({ ratings: [], averageRating: 0 });
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/store/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setData(res.data);
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.put(`${process.env.REACT_APP_API_URL}/user/password`, { password: newPassword }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setNewPassword('');
    alert('Password updated');
  };

  return (
    <div className="container">
      <h1>Store Owner Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <div>
        <h3>Update Password</h3>
        <form onSubmit={handleUpdatePassword}>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
          <button type="submit">Update</button>
        </form>
      </div>
      <div>
        <h3>Ratings</h3>
        <p>Average Rating: {data.averageRating}</p>
        <table>
          <thead>
            <tr>
              <th>User Name</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.ratings.map((rating, index) => (
              <tr key={index}><td>{rating.name}</td><td>{rating.rating}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StoreOwnerDashboard;