require('../src/utils/logger');
const express = require('express');
const connect = require('../src/dbConnect');
const path = require('path');
const ejsLayouts = require('express-ejs-layouts');
const app = express();

const defaultLang = 'en';
app.use('/', express.static(path.join(__dirname, '../public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(ejsLayouts);


connect().then(() => {
  console.log('Database connected successfully');
}).catch((err) => {
  console.error('Error connecting to database:', err);
});

app.get('/', function (req, res) {
  try {
    return res.render('web/home', { layout: `layouts/web`});
  } catch (error) {
    console.error('Error rendering the home view:', error);
  }
});

module.exports = { app, connect };