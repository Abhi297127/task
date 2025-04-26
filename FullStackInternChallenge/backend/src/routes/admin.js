const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const { validateUserInput } = require('../utils/validation');

router.post('/users', auth(['admin']), async (req, res) => {
  const { name, email, password, address, role } = req.body;
  const errors = validateUserInput(name, email, password, address);
  if (Object.keys(errors).length) return res.status(400).json(errors);

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, role]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/stores', auth(['admin']), async (req, res) => {
  const { name, email, address, owner_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO stores (name, email, address, owner_id) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, address, owner_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/dashboard', auth(['admin']), async (req, res) => {
  try {
    const users = await pool.query('SELECT COUNT(*) FROM users');
    const stores = await pool.query('SELECT COUNT(*) FROM stores');
    const ratings = await pool.query('SELECT COUNT(*) FROM ratings');
    res.json({
      totalUsers: users.rows[0].count,
      totalStores: stores.rows[0].count,
      totalRatings: ratings.rows[0].count,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/users', auth(['admin']), async (req, res) => {
  const { filterName, filterEmail, filterAddress, filterRole, sortBy = 'name', order = 'asc' } = req.query;
  let query = 'SELECT id, name, email, address, role FROM users WHERE 1=1';
  const params = [];

  if (filterName) { query += ` AND name ILIKE $${params.length + 1}`; params.push(`%${filterName}%`); }
  if (filterEmail) { query += ` AND email ILIKE $${params.length + 1}`; params.push(`%${filterEmail}%`); }
  if (filterAddress) { query += ` AND address ILIKE $${params.length + 1}`; params.push(`%${filterAddress}%`); }
  if (filterRole) { query += ` AND role = $${params.length + 1}`; params.push(filterRole); }

  query += ` ORDER BY ${sortBy} ${order}`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/stores', auth(['admin']), async (req, res) => {
  const { filterName, filterEmail, filterAddress, sortBy = 'name', order = 'asc' } = req.query;
  let query = 'SELECT s.*, AVG(r.rating) as rating FROM stores s LEFT JOIN ratings r ON s.id = r.store_id WHERE 1=1';
  const params = [];

  if (filterName) { query += ` AND s.name ILIKE $${params.length + 1}`; params.push(`%${filterName}%`); }
  if (filterEmail) { query += ` AND s.email ILIKE $${params.length + 1}`; params.push(`%${filterEmail}%`); }
  if (filterAddress) { query += ` AND s.address ILIKE $${params.length + 1}`; params.push(`%${filterAddress}%`); }

  query += ` GROUP BY s.id ORDER BY ${sortBy} ${order}`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;