const express = require('express');
const router = express.Router();
const pool = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const { validateSignup } = require('../utils/validation'); // Match the export name

router.post('/signup', async (req, res) => {
  console.log('Signup request body:', req.body); // Keep this debug log
  const errors = validateSignup(req.body); // Use the imported function
  console.log('Validation errors:', errors); // Keep this debug log
  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  try {
    const { name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password, address, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, email, hashedPassword, address, 'user']
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Signup error:', error); // Keep this debug log
    res.status(500).json({ message: 'Server error' });
  }
});
  
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (!result.rows.length) return res.status(400).json({ message: 'Invalid credentials' });

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.put('/password', auth(['user', 'store_owner']), async (req, res) => {
  const { password } = req.body;
  if (!password || password.length < 8 || password.length > 16 || 
      !/[A-Z]/.test(password) || !/[!@#$%^&*]/.test(password)) {
    return res.status(400).json({ message: 'Invalid password format' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, req.user.id]);
    res.json({ message: 'Password updated' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/stores', auth(['user']), async (req, res) => {
  const { searchName, searchAddress, sortBy = 'name', order = 'asc' } = req.query;
  let query = `
    SELECT s.*, AVG(r.rating) as overall_rating, ur.rating as user_rating
    FROM stores s
    LEFT JOIN ratings r ON s.id = r.store_id
    LEFT JOIN ratings ur ON s.id = ur.store_id AND ur.user_id = $1
    WHERE 1=1
  `;
  const params = [req.user.id];

  if (searchName) { query += ` AND s.name ILIKE $${params.length + 1}`; params.push(`%${searchName}%`); }
  if (searchAddress) { query += ` AND s.address ILIKE $${params.length + 1}`; params.push(`%${searchAddress}%`); }

  query += ` GROUP BY s.id, ur.rating ORDER BY ${sortBy} ${order}`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/ratings', auth(['user']), async (req, res) => {
  const { store_id, rating } = req.body;
  if (!rating || rating < 1 || rating > 5) return res.status(400).json({ message: 'Invalid rating' });

  try {
    await pool.query(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES ($1, $2, $3) ON CONFLICT (user_id, store_id) DO UPDATE SET rating = $3',
      [req.user.id, store_id, rating]
    );
    res.status(201).json({ message: 'Rating submitted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;