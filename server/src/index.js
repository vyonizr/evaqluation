require('dotenv').config()

const express = require('express')
const cors = require('cors')
const PORT = process.env.PORT || 5000
const routes = require('./routes')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.listen(PORT, () => {
  console.log(`Evaqlueation: listening on port ${PORT}`)
})