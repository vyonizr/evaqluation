const uniqid = require('uniqid')
const axios = require('axios');
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript, smsContent, tweetContents, postTweet } = require('../helpers')
const disasterType = 'earthquake'

class Earthquake {
  static async createNewEarthquakeInfo(req, res){
    try {
      const { aftershocks, depth, earthquake_point, magnitude, tsunami, time, lat, lng } = req.body
      firebase.database().ref('earthquakes/' + uniqid()).set({
        aftershocks,
        depth,
        earthquake_point,
        magnitude,
        tsunami,
        time,
        lat,
        lng
      });

      await textToSpeech(announcerTranscript(disasterType, req.body))

      if (process.env.NODE_ENV === 'prod') {
        await axios.post(`https://api.wavecell.com/sms/v1/${process.env.SUB_ACCOUNT_ID_WAVECELL}/many`, {
        clientBatchId: 'abc-123',
        messages: [
            {
              destination: '6281809505877',
              clientMessageId: '1000',
            }
          ],
        template: {
          source: 'QLUSTER',
          text: smsContent('earthquake', req.body),
          encoding: 'AUTO'
        }
        },{
          headers:{
            Authorization: `Bearer ${process.env.WAVECELL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
      }

      postTweet(tweetContents(disasterType, req.body))

      res.status(201).send('Earthquake info successfully sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake