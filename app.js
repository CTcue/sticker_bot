var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/", function (req, res, next) {
    var userName = req.body.user_name || "you";
    var payload = {
      text : "Hello, " + userName + "!"
    };

    // avoid infinite loop
    if (userName !== "slackbot") {
        var payload = {
            "text": "http://currencybot.github.io/CurrencyBot.png"
        };

        res.send(JSON.stringify(payload));
        res.end();
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