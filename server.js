// Import Module
const express = require('express');
const app = express();


// Routing
const home = require('./routes/home');


// App Setting
app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', home);


module.exports = app;