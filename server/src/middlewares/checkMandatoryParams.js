module.exports = async (req, res, next) => {
  if (req.baseUrl === '/earthquakes') {
    if (req.body.aftershocks
    && req.body.depth
    && req.body.earthquake_point
    && req.body.magnitude
    && req.body.tsunami
    && req.body.time
    && req.body.lat
    && req.body.lng) {
      next()
    }
    else {
      res.status(401).json({
        message: 'Missing mandatory parameter(s)'
      })
    }
  }
  else if (req.baseUrl === '/floods') {
    if (req.body.lock
    && req.body.status
    && req.body.time
    && req.body.water_level
    && req.body.weather
    && req.body.lat
    && req.body.lng) {
      next()
    }
    else {
      res.status(401).json({
        message: 'Missing mandatory parameter(s)'
      })
    }
  }
}