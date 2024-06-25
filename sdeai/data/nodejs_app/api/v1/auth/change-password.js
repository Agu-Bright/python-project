const express = require('express');
const router = express.Router();
const db = require('../../db/database');
const bcrypt = require('bcrypt');
const { check, validationResult } = require('express-validator');

// Change Password
router.post('/api/v1/auth/change-password', [
  check('current_password').notEmpty().withMessage('Current password is required'),
  check('new_password').isLength({ min: 6 }).withMessage('New password must be at least 6 characters long')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error_message: errors.array() });
  }

  const { current_password, new_password } = req.body;
  const userId = req.user.id;

  try {
    const userRes = await db.query('SELECT password FROM users WHERE id = $1', [userId]);
    if (userRes.rows.length === 0) {
      return res.status(404).json({ error_message: 'User not found' });
    }

    const user = userRes.rows[0];
    const isMatch = await bcrypt.compare(current_password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error_message: 'Current password is incorrect' });
    }

    const hashedPassword = await bcrypt.hash(new_password, 10);
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error_message: err.message });
  }
});

module.exports = router;
