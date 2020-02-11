const router = require('express').Router()
const { Flood } = require('../controllers')

router.get('/', Flood.getAllLocksData)

module.exports = router