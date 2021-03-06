const passport = require('passport')
const Tb_User = require('../models').Tb_User
const Tb_Resto = require('../models').Tb_Resto
const Tb_Resto_Fac = require('../models').Tb_Resto_Fac
const Tb_Gallery = require('../models').Tb_Gallery
const Tb_Resto_Menu = require('../models').Tb_Resto_Menu
const UserC = require('../controllers').UserC
const config = require('../config/sconfig')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}
const LocalSignup = new localStrategy(localOptions,function(req,email,password,done){
  const passwordG = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  const data = {
    Id : UserC.guid(),
    fullName: req.body.fullName,    
    Email: email,
    Password: passwordG,
    Phone: '',
    Type: 'USER',
    Age: 0,
    Weight: 0,
    Height: 0,
    EContact: '',
    DpName: '',
    DpType: '',
    DpId: '',
    Status: true
  }
  return UserC.create(data,done)
})

const localLogin = new localStrategy(localOptions,function(req,email,password,done){
  const data = {
    email,
    password
  }
  return UserC.login(data,done)
})

const jwtOptions = {
  algorithms: 'HS256',
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.secret
}

const jwtlogin = new JwtStrategy(jwtOptions, function(payload,done){
  const today = new Date().getTime(),
        jwtS = Math.abs(today - payload.iat)/36e5
  if(today >= payload.iat && jwtS <= 24){
    Tb_User.findById(payload.sub, 
      {
        include: [{
          model: Tb_Resto,
          as: 'userResto',
          include: [
            {
              model: Tb_Resto_Fac,
              attributes: ['Id','Icon','Id_Resto','Name']
            },
            {
              model: Tb_Gallery,
              attributes: ['Id','Type','PID','Pname','Ptype']
            },
            {
              model: Tb_Resto_Menu,
              attributes: ['Id','Name','Price','Description','PID','Pname','Ptype','Type']
            }
          ]
        }] 
    })
    .then(user => {
        if(!user){return done(null,false)}
        else{return done(null,user)}
    })
    .catch(error => {return done(error,false)})
  }else{
    return done(null,false)
  }
})
passport.use('L-signup',LocalSignup)
passport.use('jwt',jwtlogin)
passport.use('L-login',localLogin)
