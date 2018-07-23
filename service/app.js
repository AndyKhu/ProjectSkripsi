const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const schedule = require('node-schedule')
const algorithm = require('./algorithm.js')

// var j = schedule.scheduleJob('*/50 * * * *', function(){
//   algorithm.execute()
// })

const app = express()
app.use(cors());
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

require('./server/routes')(app)
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of nothingness.',
}))

module.exports = app