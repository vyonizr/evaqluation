const announcerTranscript = require('./announcerTranscript')
const textToSpeech = require('./textToSpeech')
const locksData = require('./dummyLocks.json')
const smsContent = require('./smsContent')
const tweetContents = require('./tweetContents')
const postTweet = require('./postTweet')
const smsSender = require('./smsSender')

module.exports = {
  announcerTranscript,
  textToSpeech,
  locksData,
  smsContent,
  tweetContents,
  postTweet,
  smsSender
}