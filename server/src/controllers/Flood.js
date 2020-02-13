const uniqid = require('uniqid')
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript, locksData, tweetContents, postTweet } = require('../helpers')
const disasterType = 'flood'

class Flood{
  static async getAllLocksData(req, res){
    try {
      res.status(200).json(locksData)
    } catch (error) {
      console.log(error)
    }
  }

  static async createNewWaterLockInfo(req, res) {
    try {
      const { lock, status, time, water_level, weather, lat, lng } = req.body
      firebase.database().ref('floods/' + uniqid()).set({
        lock,
        status,
        time,
        water_level,
        weather,
        lat,
        lng,
        base64: await textToSpeech(announcerTranscript(disasterType, req.body))
      });

      postTweet(tweetContents(disasterType, req.body))

      if (process.env.NODE_ENV === 'prod') {
        await smsSender(disasterType, req.body)
      }

      res.status(201).send('Water lock info successfully sent to firebase database')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Flood