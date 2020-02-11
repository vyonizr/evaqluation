const fs = require('fs');
const axios = require('axios')

async function textToSpeech(text) {
  try {
    const request = {
      input: {
        text
      },
      "voice": {
        "languageCode": "id-ID",
        "name": "id-ID-Wavenet-A"
      },
      "audioConfig": {
        "audioEncoding":"MP3",
        "pitch": 0,
        "speakingRate": 1
      }
    };

    const { data } = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_API_KEY}`, request)

    fs.writeFileSync('output_psa.mp3', data.audioContent, 'base64')
    console.log('Audio content written to file: output_psa.mp3');
  }
  catch (error) {
    console.log(error);
  }
}

module.exports = textToSpeech