const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Toggle task completion status by task ID
router.patch('/api/v1/task/:task_id/toggle', async (req, res) => {
  try {
    const { task_id } = req.params;
    const taskQuery = 'SELECT completed FROM tasks WHERE id = $1';
    const taskResult = await db.query(taskQuery, [task_id]);
    if (taskResult.rows.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    const currentStatus = taskResult.rows[0].completed;
    const newStatus = !currentStatus;
    const updateQuery = 'UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *';
    const updateResult = await db.query(updateQuery, [newStatus, task_id]);
    res.json({ success: true, task: updateResult.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;