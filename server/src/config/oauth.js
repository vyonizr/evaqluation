const OAuth = require('oauth')

const oauth = new OAuth.OAuth(
  'https://api.twitter.com/oauth/request_token',
  'https://api.twitter.com/oauth/access_token',
    process.env.CONSUMER_KEY, //consumer key
    process.env.CONSUMER_SECRET,//consumer secret key
  '1.0A',
  null,
  'HMAC-SHA1'
)

module.exports = oauth