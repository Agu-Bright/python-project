const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Verify Email Endpoint
router.post('/api/v1/auth/verify-email', async (req, res) => {
  const { email, verification_code } = req.body;
  try {
    const result = await db.query('SELECT * FROM email_verifications WHERE email = $1 AND verification_code = $2', [email, verification_code]);
    if (result.rows.length > 0) {
      await db.query('UPDATE users SET is_verified = TRUE WHERE email = $1', [email]);
      res.json({ success: true, message: 'Email verified successfully' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid verification code' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;