const oauth = require('../config/oauth')
function postTweet(status){
  oauth.post(
    `https://api.twitter.com/1.1/statuses/update.json?status=${status}`,
    process.env.ACCESS_TOKEN,//token
    process.env.SECRET_TOKEN,//secret token
      'str',
      'str', //emang teks gini aja
    (e, data, resp) => {
      return null
    }
  )
}

module.exports = postTweet