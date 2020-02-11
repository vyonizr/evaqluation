const router = require('express').Router()
const earthquakes = require('./earthquakes')
const floods = require('./floods')

router.use('/earthquakes', earthquakes)
router.use('/floods', floods)
router.get('*', (req, res) => {
  res.status(404).send('Not found');
});

module.exports = router