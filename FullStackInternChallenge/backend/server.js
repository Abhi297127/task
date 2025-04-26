const express = require('express');
const cors = require('cors');
const pool = require('./src/db');
const adminRoutes = require('./src/routes/admin');
const userRoutes = require('./src/routes/user');
const storeRoutes = require('./src/routes/store');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Connected to database');
});

// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/store', storeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));