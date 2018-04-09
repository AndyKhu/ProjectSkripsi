const config = require('../../config');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt')
const saltRounds = 10 //the higher the better - the longer it takes to generate & compare
function tokenForUser(user){
	const timestamp = new Date().getTime();
		return jwt.encode({ sub: user.id, iat: timestamp },config.session_secret);
  	}
function guid(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = {
	login: (req, res) => {
		const { user } = req
		res.json({token:tokenForUser(user), id:user.id, username:user.fullname,type:user.type})
	},

	signup: (db) => (req, res, next) => {
		const username = req.body.username;
		const password = req.body.password;
		const fullname = req.body.fullname;
		const ID = guid();
		if(!username || !password){
			return res.status(422).send({error : 'You must provide username , email and password '});
		}
		db.query('SELECT id, username, password, type FROM users WHERE username=$1', [username], (err, result) => {
			if(err) {
				winston.error('Error when Find user', err)
				return next(err)
			}

			if(result.rows.length > 0) {
				res.status(422).send({error : 'Username is in use'});
			} else {
				db.query('insert into users values ($1,$2,$3,$4,$5)', 
				[ID,username,bcrypt.hashSync(password, saltRounds),'user',fullname], (err, result) => {
					if(err){
						winston.error('Error when selecting user on Sign Up', err)
						return next(err)
					}else{
						res.json({token:tokenForUser({username: username , type: 'user' }),id: ID, username: fullname,type: 'user'})
					}
				})
			}
		})
	},

	logout: (req, res, next) => {
		req.session.destroy((err) => {
			if(err) return next(err)

			req.logout()

			res.sendStatus(200)
		})
	},

	ping: function(req, res) {
		res.sendStatus(200)
	}
}

