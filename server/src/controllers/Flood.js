const uniqid = require('uniqid')
const axios = require('axios');
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript, locksData, smsContent, tweetContents, postTweet } = require('../helpers')
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
          text: smsContent('flood', req.body),
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

      res.status(201).send('Water lock info successfully sent to firebase database')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Flood