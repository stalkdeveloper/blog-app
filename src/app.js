require('../src/utils/logger'); // for multiple log
const express = require('express');
const connect = require('../src/dbConnect');

const app = express();

connect().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.error('Error connecting to database:', err);
});

app.get('/', function (req, res) {
    res.send('Hello World');
});

module.exports = { app, connect };
