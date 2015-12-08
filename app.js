"use strict";

var _ = require("lodash");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();

app.set("port", (process.env.PORT || 5000));
app.set("base", "https://desolate-citadel-3922.herokuapp.com/img/");
app.use('/img', express.static('stickers'));
app.use(bodyParser.urlencoded({ extended: true }));

var Slack = require('node-slack');
var slack = new Slack(process.env.WEBHOOK, {});

var images = require("./stickers/__mapping__").images;
var emoji = ["pig", "rabbit", "frog", "cow", "octopus", "cat", "cat2", "rooster"];

var levenshtein = require('fast-levenshtein');

function calcScore(obj, str) {
    var split = str.split(" ");
    var score = 0;

    // Get basic score if str is in obj.tags
    if (obj.tags.join(" ").indexOf(str) >= 0) {
        score += 1.5;
    }

    for (var i=0; i<obj.tags.length; i++) {
        for (var j=0; j<split.length; j++) {
            if (obj.tags[i] === split[j]) {
                score += 3;
            }
            // Small spelling error still get some score
            else {
                var dist = levenshtein.get(obj.tags[i], split[j]);
                if (dist < 3) {
                    score += 1.5;
                }

                // Sub string match
                if (obj.tags[i].indexOf(split[j]) >= 0) {
                    score += .75;
                }
            }
        }
    }

    // Check if "param" contains the subject
    if (_.has(obj, "subject") && obj.subject && str.indexOf(obj.subject) >= 0) {
        score *= 2;
    }

    return score;
}

function isURL(str) {
  var pattern = new RegExp('^https?:\/\/','i');
  return pattern.test(str);
}

app.post("/images", function (req, res, next) {
    if (req.body.user_name !== "slackbot" && req.body.text && req.body.text.length > 1) {

        var matches = [];
        for (var i=0; i<images.length; i++) {
            matches.push({
              "index": i,
              "score": calcScore(images[i], req.body.text.trim().toLowerCase())
            });
        }

        // Sort by score and select "best" match
        var best_match = _.sortBy(matches, "score").pop();
        var best_image = images[best_match.index];
        var random_url = _.sample(best_image.img);

        // Allow external sources
        if (isURL(random_url)) {
            var img_link = random_url;
        }
        else {
            var img_link = [
                app.get("base"),
                random_url,
                "?id=",
                new Date().getTime()
            ].join("");
        }

        if (best_match.score > 0) {
            slack.send({
                text:  encodeURI(img_link) + "\n" + req.body.text,
                channel: (req.body.channel_id || "#random"),
                // channel: '#' + (req.body.channel_name || "random"),
                username: 'Sticker',
                icon_emoji: ':' + _.sample(emoji) + ':',
                unfurl_links: true,
                link_names: 1
            });
        }
    }

    return res.status(200).end();
});


// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(400).send(err.message);
});

app.listen(app.get("port"), function () {
  console.log("Slack bot listening on port", app.get("port"));
});
