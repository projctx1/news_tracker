"use strict";

var express = require('express');
var app = express();
var port = process.env.PORT;
app.use(express.json());
app.get('/health', function (req, res) {
  res.status(200).send('OK');
});
app.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the Node server!'
  });
});
app.listen(port, function () {
  console.log("Server running at http://localhost:".concat(port));
});