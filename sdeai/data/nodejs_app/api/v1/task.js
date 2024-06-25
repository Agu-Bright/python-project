const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Create a new task
router.post('/api/v1/task', async (req, res) => {
  try {
    const { title, description, due_date, priority } = req.body;
    const result = await db.query(
      'INSERT INTO tasks (title, description, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, due_date, priority]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch paginated tasks
router.get('/api/v1/task', async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const offset = (page - 1) * limit;
    const tasks = await db.query('SELECT * FROM tasks ORDER BY created_at DESC LIMIT $1 OFFSET $2', [limit, offset]);
    const totalTasks = await db.query('SELECT COUNT(*) FROM tasks');

    res.json({
      tasks: tasks.rows,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalTasks.rows[0].count / limit),
        totalTasks: totalTasks.rows[0].count
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user profile
router.put('/api/v1/profile', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await db.query(
      'UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING *',
      [name, email, password, req.user.id] // Assuming user ID is stored in req.user.id after authentication
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;