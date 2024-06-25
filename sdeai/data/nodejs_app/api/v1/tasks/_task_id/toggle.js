const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Toggle the completion status of a specific task
router.post('/api/v1/tasks/:task_id/toggle', async (req, res) => {
  try {
    const { task_id } = req.params;
    const taskResult = await db.query('SELECT * FROM tasks WHERE id = $1', [task_id]);
    if (taskResult.rows.length > 0) {
      const task = taskResult.rows[0];
      const newStatus = !task.completed; // Toggle the completion status
      const updateResult = await db.query('UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *', [newStatus, task_id]);
      res.json({ status: newStatus, task: updateResult.rows[0] });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;