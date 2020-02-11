const uniqid = require('uniqid')
const axios = require('axios');
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript } = require('../helpers')

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

      await textToSpeech(announcerTranscript('earthquake', req.body))

      if (process.env.NODE_ENV === 'prod') {
        const wavecellResponse = await axios.post(`https://api.wavecell.com/sms/v1/${process.env.SUB_ACCOUNT_ID_WAVECELL}/many`, {
        clientBatchId: 'abc-123',  
        messages: [
            {
              destination: '6281809505877',
              clientMessageId: '1000',
            }
          ],
        template: {
          source: 'QLUSTER',
          text: 'test',
          encoding: 'AUTO'
        }
        },{
          headers:{
            Authorization: `Bearer ${process.env.WAVECELL_API_KEY}`,
            'Content-Type': 'application/json'
          }
        });
  
        console.log(wavecellResponse.data)
      }

      res.status(201).send('Earthquake info successfully sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake