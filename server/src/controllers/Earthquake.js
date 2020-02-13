const uniqid = require('uniqid')
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript, tweetContents, postTweet } = require('../helpers')
const disasterType = 'earthquake'

class Earthquake {
  static async createNewEarthquakeInfo(req, res){
    const newID = uniqid()
    try {
      const { aftershocks, depth, earthquake_point, magnitude, tsunami, time, lat, lng } = req.body
      firebase.database().ref('earthquakes/' + newID).set({
        aftershocks,
        depth,
        earthquake_point,
        magnitude,
        tsunami,
        time,
        lat,
        lng,
        base64: await textToSpeech(announcerTranscript(disasterType, req.body))
      });

      postTweet(tweetContents(disasterType, req.body))

      if (process.env.NODE_ENV === 'prod') {
        await smsSender(disasterType, req.body)
      }

      res.status(201).send('Earthquake info successfully sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake