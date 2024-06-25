const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const bcrypt = require('bcrypt');

// Reset Password
router.post('/api/v1/auth/reset-password', async (req, res) => {
  const { email, new_password, token } = req.body;
  // Token validation logic here
  // Note: Implement token validation as per your application's security requirements
  try {
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const result = await db.query('UPDATE users SET password = $1 WHERE email = $2 RETURNING id', [hashedPassword, email]);
    if (result.rowCount > 0) {
      res.json({ success: true, message: 'Password reset successful' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Profile
router.put('/api/v1/profile', async (req, res) => {
  const { id, name, email, password } = req.body;
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    const updateQuery = `UPDATE users SET 
      name = COALESCE($1, name),
      email = COALESCE($2, email),
      password = COALESCE($3, password)
      WHERE id = $4 RETURNING id`;
    const result = await db.query(updateQuery, [name, email, hashedPassword, id]);
    if (result.rowCount > 0) {
      res.json({ success: true, message: 'Profile updated successfully' });
    } else {
      res.status(404).json({ success: false, message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;