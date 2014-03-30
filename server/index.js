var express = require('express');
var app = express();

app = require('./config-app.js')(app);



module.exports = app;
