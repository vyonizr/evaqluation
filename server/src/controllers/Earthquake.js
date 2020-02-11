const uniqid = require('uniqid')
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript } = require('../helpers')

class Earthquake {
  static async createNewEarthquakeInfo(req, res){
    try {
      const { aftershocks, depth, earthquake_point, magnitude, tsunami } = req.body
      firebase.database().ref('earthquakes/' + uniqid()).set({
        aftershocks,
        depth,
        earthquake_point,
        magnitude,
        tsunami
      });

      await textToSpeech('earthquake', PSAGenerator(req.body))

      res.status(201).send('Sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake