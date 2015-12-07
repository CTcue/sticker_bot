var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));

var bot = require('./bot');
app.post('/hello', bot);

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(app.get("port"), function () {
  console.log('Slack bot listening on port', app.get("port"));
});