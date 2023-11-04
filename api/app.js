const express = require('express');
const cors = require('cors');
const app = express();

// Cors
app.use(cors());

// Todo routes
const todos = require('./api/todos');
app.use('/', todos);

// Start Express
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
