//index.js

const functions = require('firebase-functions');
const app = require('express')();

const {
    getAllTodos,
    postOneTodo,
    deleteTodo,
    editTodo
} = require('./APIs/todos')

const {
    loginUser
} = require('./APIs/users')

// Todos
app.get('/todos', getAllTodos);
app.post('/todo', postOneTodo);
app.delete('/todo/:todoId', deleteTodo);
app.put('/todo/:todoId', editTodo);

// Users
app.post('/login', loginUser);

exports.api = functions.https.onRequest(app);