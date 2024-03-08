// server.js (Back-End)

const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg'); // PostgreSQL library

const app = express();
const port = process.env.PORT || 3000;

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'your_db_user',
  password: 'your_db_password',
  host: 'localhost',
  database: 'bank_db',
  port: 5432,
});

app.use(bodyParser.json());

// API endpoints for customers
app.get('/api/customers', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM customers');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/customers', async (req, res) => {
  const { name, email } = req.body;
  try {
    await pool.query('INSERT INTO customers (name, email) VALUES ($1, $2)', [name, email]);
    res.status(201).json({ message: 'Customer created successfully' });
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ... other routes for accounts, transactions, etc.

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
