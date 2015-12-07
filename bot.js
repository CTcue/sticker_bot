
module.exports = function (req, res, next) {
  var userName = req.body.user_name || "you";
  var payload = {
    text : 'Hello, ' + userName + '!'
  };

  var options = {
    root: __dirname + '/stickers/',

    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    res.sendFile("nice.png", options, function(err) {
        res.status(err.status).end();
    });
  }
  else {
    return res.status(200).end();
  }
};