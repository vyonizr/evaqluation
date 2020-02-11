const router = require('express').Router()
const { Flood } = require('../controllers')
const { checkMandatoryParams } = require('../middlewares')

router.get('/', Flood.getAllLocksData)
router.post('/', checkMandatoryParams, Flood.createNewWaterLockInfo)

module.exports = router