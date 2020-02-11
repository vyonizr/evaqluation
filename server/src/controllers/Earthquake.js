const uniqid = require('uniqid')
const axios = require('axios');
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

      // await textToSpeech(announcerTranscript('earthquake', req.body))

      const wavecellResponse = await axios.post(`https://api.wavecell.com/sms/v1/${process.env.SUB_ACCOUNT_ID_WAVECELL}/many`, {
      clientBatchId: 'abc-123',  
      messages: [
          {
            destination: '+6285218824524',
            clientMessageId: '1000',
            text: 'Bob, special present for you from Santa'
          }
        ],
      template: {
        source: 'EvaQlueAtion',
        text: announcerTranscript('earthquake', req.body),
        encoding: 'AUTO'
      }
      },{
        headers:{
          Authorization: `Bearer ${process.env.WAVECELL_API_KEY}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(wavecellResponse.data)

      res.status(201).send('Sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake