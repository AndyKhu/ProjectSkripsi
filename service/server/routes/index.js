const UserC = require('../controllers').UserC
const passportService = require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt',{session: false})
const Signup = passport.authenticate('L-signup',{session: false})
const Login = passport.authenticate('L-login',{session: false})
module.exports = (app) => {
  app.get('/',requireAuth,function(req,res){
    res.send({message: 'nothing'})
  });
  app.post('/api/signup',Signup,UserC.signup)
  app.post('/api/login',Login,UserC.signin)
}