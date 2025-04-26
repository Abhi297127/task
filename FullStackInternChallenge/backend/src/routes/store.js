const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

router.get('/dashboard', auth(['store_owner']), async (req, res) => {
  try {
    const ratings = await pool.query(
      'SELECT u.name, r.rating FROM ratings r JOIN users u ON r.user_id = u.id WHERE r.store_id IN (SELECT id FROM stores WHERE owner_id = $1)',
      [req.user.id]
    );
    const avgRating = await pool.query(
      'SELECT AVG(r.rating) as average_rating FROM ratings r WHERE r.store_id IN (SELECT id FROM stores WHERE owner_id = $1)',
      [req.user.id]
    );
    res.json({
      ratings: ratings.rows,
      averageRating: avgRating.rows[0].average_rating || 0,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;