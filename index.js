const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Server chal raha hai! 🚀' });
});

// Users fetch karo database se
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Server start karo
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server port ${PORT} pe chal raha hai`);
});
