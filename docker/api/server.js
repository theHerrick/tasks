const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Create MySQL connection
const db = mysql.createConnection({
  host: 'todo-mysqldb',
  user: 'root',
  password: 'rootpassword',
  database: 'tododb',
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

const app = express();
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors({
    origin: '*'
}));

// Create a todo
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  const sql = 'INSERT INTO todo (task) VALUES (?)';
  db.query(sql, [task], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to create todo' });
    } else {
      res.status(201).json({ id: result.insertId, task });
    }
  });
});

// Read all todos
app.get('/api/todos', (req, res) => {
  const sql = 'SELECT * FROM todo';
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch todos' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Read a todo by ID
app.get('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM todo WHERE id = ?';
  db.query(sql, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch todo' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json(results[0]);
    }
  });
});

// Update a todo by ID
app.put('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const { task } = req.body;
  const sql = 'UPDATE todo SET task = ? WHERE id = ?';
  db.query(sql, [task, id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to update todo' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(200).json({ id, task });
    }
  });
});

// Delete a todo by ID
app.delete('/api/todos/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todo WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      res.status(500).json({ error: 'Failed to delete todo' });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Todo not found' });
    } else {
      res.status(204).end();
    }
  });
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
