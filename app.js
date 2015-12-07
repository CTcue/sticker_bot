var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 3000;

console.log("STARTING");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.status(200).send('Hello.')
});

var bot = require('./bot');
app.post('/hello', bot);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(port, function () {
  console.log('Slack bot listening on port ' + port);
});