
module.exports = function (req, res, next) {
  var userName = req.body.user_name || "you";
  var payload = {
    text : 'Hello, ' + userName + '!'
  };

  // avoid infinite loop
  if (userName !== 'slackbot') {
    return res.status(200).send('http://currencybot.github.io/CurrencyBot.png')
  }
  else {
    return res.status(200).end();
  }
};