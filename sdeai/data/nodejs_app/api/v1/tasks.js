const express = require('express');
const router = express.Router();
const db = require('../../db/database');

// Create a new task or search for tasks based on provided search criteria
router.post('/api/v1/tasks', async (req, res) => {
  try {
    const { title, description, due_date, priority, search_criteria } = req.body;

    // Check if search criteria is provided
    if (search_criteria) {
      const searchQuery = 'SELECT * FROM tasks WHERE title ILIKE $1 OR description ILIKE $1 OR priority = $2';
      const searchValues = [`%${search_criteria}%`, search_criteria];
      const results = await db.query(searchQuery, searchValues);
      res.json(results.rows);
    } else {
      const insertQuery = 'INSERT INTO tasks (title, description, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *';
      const insertValues = [title, description, due_date, priority];
      const result = await db.query(insertQuery, insertValues);
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;