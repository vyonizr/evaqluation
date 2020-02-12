const uniqid = require('uniqid')
const axios = require('axios');
const firebase = require('../config/firebase')
const { textToSpeech, announcerTranscript, smsContent, tweetContents, postTweet } = require('../helpers')
const disasterType = 'earthquake'
const { Storage } = require('@google-cloud/storage');
const storage = new Storage();

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

      // async function uploadFile() {
      //   await storage.bucket('announcements').upload(`output_psa.mp3`, {
      //     destination: `output_psa_${newID}.mp3`
      //   });

      //   console.log(`${filename} uploaded to ${bucketName}.`);
      // }

      // await uploadFile()

      postTweet(tweetContents(disasterType, req.body))

      res.status(201).send('Earthquake info successfully sent to firebase database')
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Earthquake