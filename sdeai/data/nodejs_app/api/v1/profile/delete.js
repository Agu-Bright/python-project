const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Delete the user's account including all tasks associated with the account
router.delete('/api/v1/profile/delete', async (req, res) => {
  try {
    await db.query('BEGIN'); // Start transaction
    const { userId } = req.user; // Assuming userId is extracted from authenticated user context
 
    // Delete tasks associated with the account
    await db.query('DELETE FROM tasks WHERE user_id = $1', [userId]);

    // Delete the user's account
    await db.query('DELETE FROM users WHERE id = $1', [userId]);

    await db.query('COMMIT'); // Commit transaction

    res.json({ status: 'success', message: 'Account and associated tasks deleted successfully.' });
  } catch (err) {
    await db.query('ROLLBACK'); // Rollback transaction in case of error
    res.status(500).json({ status: 'error', message: err.message });
  }
});

module.exports = router;