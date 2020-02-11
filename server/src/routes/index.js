const router = require('express').Router()
const earthquakes = require('./earthquakes')

router.use('/earthquakes', earthquakes)
router.get('*', (req, res) => {
  res.status(404).send('Not found');
});

module.exports = router