var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/", function (req, res, next) {
    if (process.env.NODE_ENV === req.body.token && req.body.user_name !== "slackbot") {
        var payload = {
            "text": "http://currencybot.github.io/CurrencyBot.png"
        };

        return res.send(JSON.stringify(payload)).end();
    }
    else {
        return res.status(200).end();
    }
});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(app.get("port"), function () {
  console.log("Slack bot listening on port", app.get("port"));
});