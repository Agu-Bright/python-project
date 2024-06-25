const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Delete Account
router.delete('/api/v1/auth/delete-account', async (req, res) => {
  try {
    const userId = req.user.id; // assuming user ID is available in req.user
    const results = await db.query('DELETE FROM users WHERE id = $1 RETURNING *', [userId]);
    if (results.rows.length > 0) {
      res.json({ message: 'Account deleted successfully' });
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
