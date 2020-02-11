const router = require('express').Router()
const { Flood } = require('../controllers')

router.get('/', Flood.getAllLocksData)
router.post('/', Flood.createNewWaterLockInfo)

module.exports = router