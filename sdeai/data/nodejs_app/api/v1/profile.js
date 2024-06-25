const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Update user details like name, email, password
router.put('/api/v1/profile', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  try {
    const updatedUser = await db.query(
      'UPDATE users SET name = $1, email = $2, password = $3, updated_at = NOW() WHERE id = $4 RETURNING id, name, email, updated_at',
      [name, email, password, req.user.id] // Assuming user's ID is available in req.user.id
    );

    if (updatedUser.rows.length > 0) {
      res.json({
        status: 'success',
        message: 'Profile updated successfully',
        id: updatedUser.rows[0].id,
        name: updatedUser.rows[0].name,
        email: updatedUser.rows[0].email,
        updated_at: updatedUser.rows[0].updated_at
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ status: 'failure', message: err.message });
  }
});

module.exports = router;