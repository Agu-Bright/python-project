const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../db/database');

const router = express.Router();

// Secret key for JWT, you should use environment variables for sensitive information
const JWT_SECRET = 'your_jwt_secret_key';

// Sign up user
router.post('/api/v1/auth/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const userExist = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExist.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const result = await db.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];

    // Generate JWT token
    const token = jwt.sign({ id: newUser.id }, JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ id: newUser.id, username: newUser.username, email: newUser.email, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;