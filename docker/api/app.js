const express = require('express');
const cors = require('cors');
const app = express();

// Cors
app.use(cors());

// Require the todoRoutes
const todos = require('./api/todos'); // Adjust the path as needed

// Start using the todo routes
app.use('/', todos);

// Start Express
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
