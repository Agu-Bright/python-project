const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Delete the user's account, including all tasks associated with the account
router.delete('/delete-account', async (req, res) => {
  try {
    const { id } = req.body; // Assuming user ID is sent in the request body

    // Delete all tasks associated with the user
    await db.query('DELETE FROM tasks WHERE user_id = $1', [id]);

    // Delete the user account
    await db.query('DELETE FROM users WHERE id = $1', [id]);

    res.json({ status: 'success', message: 'Account and all associated tasks deleted successfully.' });
  } catch (err) {
    res.status(500).json({ status: 'failure', message: err.message });
  }
});

module.exports = router;