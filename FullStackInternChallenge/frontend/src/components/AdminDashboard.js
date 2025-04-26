import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const AdminDashboard = () => {
  const { logout } = useContext(AuthContext);
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', address: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', owner_id: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const [statsRes, usersRes, storesRes] = await Promise.all([
      axios.get(`${process.env.REACT_APP_API_URL}/admin/dashboard`, config),
      axios.get(`${process.env.REACT_APP_API_URL}/admin/users`, config),
      axios.get(`${process.env.REACT_APP_API_URL}/admin/stores`, config),
    ]);
    setStats(statsRes.data);
    setUsers(usersRes.data);
    setStores(storesRes.data);
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/users`, newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    await axios.post(`${process.env.REACT_APP_API_URL}/admin/stores`, newStore, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchData();
  };

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>
      <button onClick={logout}>Logout</button>
      <div>
        <h3>Stats</h3>
        <p>Total Users: {stats.totalUsers}</p>
        <p>Total Stores: {stats.totalStores}</p>
        <p>Total Ratings: {stats.totalRatings}</p>
      </div>
      <div>
        <h3>Add User</h3>
        <form onSubmit={handleAddUser}>
          <input value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} placeholder="Name" />
          <input value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} placeholder="Email" />
          <input value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} placeholder="Password" />
          <input value={newUser.address} onChange={(e) => setNewUser({ ...newUser, address: e.target.value })} placeholder="Address" />
          <select value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="store_owner">Store Owner</option>
          </select>
          <button type="submit">Add User</button>
        </form>
      </div>
      <div>
        <h3>Add Store</h3>
        <form onSubmit={handleAddStore}>
          <input value={newStore.name} onChange={(e) => setNewStore({ ...newStore, name: e.target.value })} placeholder="Name" />
          <input value={newStore.email} onChange={(e) => setNewStore({ ...newStore, email: e.target.value })} placeholder="Email" />
          <input value={newStore.address} onChange={(e) => setNewStore({ ...newStore, address: e.target.value })} placeholder="Address" />
          <input value={newStore.owner_id} onChange={(e) => setNewStore({ ...newStore, owner_id: e.target.value })} placeholder="Owner ID" />
          <button type="submit">Add Store</button>
        </form>
      </div>
      <div>
        <h3>Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Address</th><th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}><td>{user.name}</td><td>{user.email}</td><td>{user.address}</td><td>{user.role}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Stores</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Address</th><th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr key={store.id}><td>{store.name}</td><td>{store.email}</td><td>{store.address}</td><td>{store.rating || 'N/A'}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;