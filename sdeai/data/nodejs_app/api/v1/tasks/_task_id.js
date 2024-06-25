const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Get a specific task based on task_id
router.get('/api/v1/tasks/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;
    const results = await db.query('SELECT * FROM tasks WHERE task_id = $1', [task_id]);
    if (results.rows.length > 0) {
      res.json(results.rows[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a specific task based on task_id
router.put('/api/v1/tasks/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;
    const { title, description, status } = req.body;
    const results = await db.query(
      'UPDATE tasks SET title = $1, description = $2, status = $3, updated_at = NOW() WHERE task_id = $4 RETURNING *',
      [title, description, status, task_id]
    );
    if (results.rows.length > 0) {
      res.json(results.rows[0]);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific task based on task_id
router.delete('/api/v1/tasks/:task_id', async (req, res) => {
  try {
    const { task_id } = req.params;
    const results = await db.query('DELETE FROM tasks WHERE task_id = $1 RETURNING *', [task_id]);
    if (results.rows.length > 0) {
      res.json({ message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;