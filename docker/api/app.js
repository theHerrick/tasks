const express = require('express');
const mysql = require('mysql');
const cors = require('cors'); // Import the cors package
const app = express();

// Enable CORS for all routes
app.use(cors());

// MySQL database connection configuration
const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'adminpassword',
    database: 'todo',
    port: 3306, // Replace with the desired port number
  };

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Define a route to fetch data from the database
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM todo';

  connection.query(query, (err, rows) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(rows);
  });
});

// Start the Express server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
