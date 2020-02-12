module.exports = (req, res, next) => {
  if (req.baseUrl === '/earthquakes') {
    if (req.body.hasOwnProperty('aftershocks')
    && req.body.hasOwnProperty('depth')
    && req.body.hasOwnProperty('earthquake_point')
    && req.body.hasOwnProperty('magnitude')
    && req.body.hasOwnProperty('tsunami')
    && req.body.hasOwnProperty('time')
    && req.body.hasOwnProperty('lat')
    && req.body.hasOwnProperty('lng')) {
      next()
    }
    else {
      res.status(401).json({
        message: 'Missing mandatory parameter(s)'
      })
    }
  }
  else if (req.baseUrl === '/floods') {
    if (req.body.hasOwnProperty('lock')
    && req.body.hasOwnProperty('status')
    && req.body.hasOwnProperty('time')
    && req.body.hasOwnProperty('water_level')
    && req.body.hasOwnProperty('weather')
    && req.body.hasOwnProperty('lat')
    && req.body.hasOwnProperty('lng')) {
      next()
    }
    else {
      res.status(401).json({
        message: 'Missing mandatory parameter(s)'
      })
    }
  }
}