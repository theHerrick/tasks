// config.js

require('dotenv').config()

module.exports = {
    apiKey: process.env.API_KEY,
    authDomain: "theherrick-todo.firebaseapp.com",
    projectId: "theherrick-todo",
    storageBucket: "theherrick-todo.appspot.com",
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
    databaseURL: "https://theherrick-todo.firebaseio.com"
};