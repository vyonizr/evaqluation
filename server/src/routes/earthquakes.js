const router = require('express').Router()
const { Earthquake } = require('../controllers')
const { checkMandatoryParams } = require('../middlewares')

router.post('/', checkMandatoryParams, Earthquake.createNewEarthquakeInfo)

module.exports = router