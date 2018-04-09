module.exports = {
	db: {
		user: 'postgres',
		password: 'postgres',
		database: 'rabbito2',
		host: 'localhost',
		port: 5432,
		max: 50,
		idleTimeoutMillis: 30000
	},
	session_secret: 'KEEPITSECRET#1'
}
