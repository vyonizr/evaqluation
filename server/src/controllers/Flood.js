const uniqid = require('uniqid')
const axios = require('axios');
const firebase = require('../config/firebase')
const { locksData } = require('../helpers')

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

      await textToSpeech(announcerTranscript('flood', req.body))
      res.status(201).send('Water lock info successfully sent to firebase database')
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = Flood