const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Sign In
router.post('/api/v1/auth/signin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const userResult = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = userResult.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Profile Update
router.put('/api/v1/profile', async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.id; // Assuming userId is attached to req by some middleware

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    await db.query(
      'UPDATE users SET name = $1, email = $2, password = COALESCE($3, password) WHERE id = $4',
      [name, email, hashedPassword, userId]
    );
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
