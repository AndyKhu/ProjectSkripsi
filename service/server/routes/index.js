const UserC = require('../controllers').UserC
const passportService = require('../services/passport');
const Tb_User = require('../models').Tb_User
const passport = require('passport')
const requireAuth = passport.authenticate('jwt',{session: false});
const Signup = passport.authenticate('L-signup',{session: false})
module.exports = (app) => {
  // app.get('/',requireAuth,function(req,res){
  //   res.send({message: 'nothing'})
  // });
  app.get('/api/signup',Signup,UserC.signup)
  app.get('/api', (req, res) => 
  {
    Tb_User.findOne({where: { Email: 'testing' }})
    .then(User => {
      console.log("lol")
      res.send({message: 'Super secret code is ABC123'})
    }).catch(err =>{
      console.log("lols")
      res.send({message: 'lol'})
    })
  }
  )
}