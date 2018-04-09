const express = require('express')
const passport = require('passport')
const winston = require('winston')
const cors = require('cors')
const db = require('./db')

const port = process.env.PORT || 3090
const app = express()

app.use(cors());

require('./config/passport')(passport, db)
require('./config/express')(app, passport, db.pool)
require('./config/routes')(app, passport, db)

const server = app.listen(port, () => {
	if(app.get('env') === 'test') return

	winston.log('Express app started on port ' + port)
})

server.on('close', () => {
	winston.log('Closed express server')

	db.pool.end(() => {
		winston.log('Shut down connection pool')
	})
})
