// app.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./db/db');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3002;

connectDB();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON in the request body

// Define a MongoDB schema
const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
  }, { versionKey: false });

// Define a MongoDB model for the "tasks" collection
const Task = mongoose.model('Task', taskSchema);

// Define a route for the GET request
app.get('/api/tasks', async (req, res) => {
  try {
    // Fetch all tasks from the 'tasks' collection
    const tasks = await Task.find();

    // Send the tasks as a JSON response
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route for the POST request
app.post('/api/tasks', async (req, res) => {
  try {
    // Extract title and description from the request body
    const { title, description } = req.body;

    // Create a new Task instance
    const newTask = new Task({
      title,
      description,
    });

    // Save the new task to the database
    const savedTask = await newTask.save();

    // Send the saved task as a JSON response
    res.json(savedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route for the PATCH request
app.patch('/api/tasks', async (req, res) => {
  try {
    // Extract _id, title, and description from the request body
    const { _id, title, description } = req.body;

    // Validate that _id is provided
    if (!_id) {
      return res.status(400).json({ error: 'Missing _id in the request body' });
    }

    // Find the task by _id and update it
    const updatedTask = await Task.findByIdAndUpdate(
      _id,
      { title, description },
      { new: true } // Return the modified document
    );

    // Check if the task was found and updated
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send the updated task as a JSON response
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define a route for the DELETE request
app.delete('/api/tasks', async (req, res) => {
  try {
    // Extract _id from the request body
    const { _id } = req.body;

    // Validate that _id is provided
    if (!_id) {
      return res.status(400).json({ error: 'Missing _id in the request body' });
    }

    // Find the task by _id and delete it
    const deletedTask = await Task.findByIdAndDelete(_id);

    // Check if the task was found and deleted
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Send the deleted task as a JSON response
    res.json(deletedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
