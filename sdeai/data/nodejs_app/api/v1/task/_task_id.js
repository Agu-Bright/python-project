
const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Update a task by task ID
router.put('/api/v1/task/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, status } = req.body;
    const results = await db.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3 WHERE id = $4 RETURNING *',
      [title, description, status, task_id]
    );
    if (results.rows.length > 0) {
      res.json({ success: true, task: results.rows[0] });
    } else {
      res.status(404).json({ success: false, error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete a task by task ID
router.delete('/api/v1/task/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;
    const results = await db.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [task_id]);
    if (results.rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(404).json({ success: false, error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
