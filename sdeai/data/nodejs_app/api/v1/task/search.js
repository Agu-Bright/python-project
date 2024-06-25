const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Search for tasks
router.get('/api/v1/task/search', async (req, res) => {
  try {
    const { query } = req.query;
    const results = await db.query('SELECT * FROM tasks WHERE name ILIKE $1 OR description ILIKE $1', [`%${query}%`]);
    res.json({ tasks: results.rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/api/v1/profile', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const { id } = req.user; // assuming some middleware authentication
    await db.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4', [name, email, password, id]);
    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;