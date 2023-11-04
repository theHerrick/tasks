const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../util/database');
const bodyParser = require('body-parser');

// MySQL
const connection = mysql.createConnection(dbConfig);
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Parse JSON
router.use(bodyParser.json());

// GET Route
router.get('/api/todos', (req, res) => {
  const userEmail = req.query.user;

  const query = 'SELECT * FROM todo WHERE user = ?';

  connection.query(query, [userEmail], (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(rows);
  });
});

// POST Route
router.post('/api/todo', (req, res) => {
  const { title, body, user } = req.body;

  if (!title || !body || !user) {
    return res.status(400).json({ error: 'Both title, body and user are required' });
  }

  const query = 'INSERT INTO todo (title, body, user) VALUES (?, ?, ?)';
  const values = [title, body, user];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.status(201).json({ message: 'Todo created successfully' });
  });
});

// DELETE Route
router.delete('/api/todo/:id', (req, res) => {
    const todoId = req.params.id;
  
    if (!todoId) {
      return res.status(400).json({ error: 'Todo ID is required' });
    }
  
    const query = 'DELETE FROM todo WHERE id = ?';
    const values = [todoId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(200).json({ message: 'Todo deleted successfully' });
      }
    });
  });

// PATCH Route
router.patch('/api/todo/:id', (req, res) => {
    const todoId = req.params.id;
    const { title, body } = req.body;
  
    if (!todoId) {
      return res.status(400).json({ error: 'Todo ID is required' });
    }
  
    if (!title && !body) {
      return res.status(400).json({ error: 'Title or Body is required for update' });
    }
  
    const updateFields = {};
    if (title) {
      updateFields.title = title;
    }
    if (body) {
      updateFields.body = body;
    }
  
    const query = 'UPDATE todo SET ? WHERE id = ?';
    const values = [updateFields, todoId];
  
    connection.query(query, values, (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }
  
      if (result.affectedRows === 0) {
        res.status(404).json({ error: 'Todo not found' });
      } else {
        res.status(200).json({ message: 'Todo updated successfully' });
      }
    });
  });

module.exports = router;
