var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.set("port", (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));


app.post("/images", function (req, res, next) {
    if (req.body.user_name !== "slackbot") {
        var payload = {
            "text": "https://raw.githubusercontent.com/CTcue/sticker_bot/master/stickers/nice.png"
        };

        return res.status(200).json(payload);
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