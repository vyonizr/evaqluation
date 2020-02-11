const router = require('express').Router()
const { Earthquake } = require('../controllers')

router.post('/', Earthquake.createNewEarthquakeInfo)

module.exports = router