import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const UserDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [stores, setStores] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchStores();
  }, [searchName]);

  const fetchStores = async () => {
    const token = localStorage.getItem('token');
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/stores?searchName=${searchName}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setStores(res.data);
  };

  const handleRate = async (storeId, rating) => {
    const token = localStorage.getItem('token');
    await axios.post(
      `${process.env.REACT_APP_API_URL}/user/ratings`,
      { store_id: storeId, rating },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchStores();
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
      <h1>User Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <div>
        <h3>Update Password</h3>
        <form onSubmit={handleUpdatePassword}>
          <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" />
          <button type="submit">Update</button>
        </form>
      </div>
      <div>
        <h3>Stores</h3>
        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Search by Name" />
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Address</th><th>Overall Rating</th><th>Your Rating</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.address}</td>
                <td>{store.overall_rating || 'N/A'}</td>
                <td>{store.user_rating || 'Not rated'}</td>
                <td>
                  <select onChange={(e) => handleRate(store.id, e.target.value)}>
                    <option value="">Rate</option>
                    {[1, 2, 3, 4, 5].map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;