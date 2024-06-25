const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Delete user account and all related tasks
router.delete('/api/v1/delete-account', async (req, res) => {
  try {
    const { id } = req.user; // Assuming user ID can be accessed from the authenticated user object

    // Start a database transaction
    await db.query('BEGIN');

    // Delete related tasks
    await db.query('DELETE FROM tasks WHERE user_id = $1', [id]);

    // Delete user account
    await db.query('DELETE FROM users WHERE id = $1', [id]);

    // Commit the transaction
    await db.query('COMMIT');

    res.json({ success: true, message: 'Account and all related tasks have been deleted successfully.' });
  } catch (err) {
    // Rollback any changes if there is an error
    await db.query('ROLLBACK');
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;