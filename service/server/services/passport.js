const passport = require('passport')
const config = require('../config/sconfig')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt-nodejs')
const helper = require('./helper')

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}

const LocalSignup = new localStrategy(localOptions,function(req,email,password,done){
  const passwordG = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
  console.log(req.body)
  const data = {
    Id : req.body.Id,
    fullName: req.body.fullName,    
    Email: email,
    Password: passwordG,
    Phone: '',
    Type: 'Member',
    Age: 0,
    Weight: 0,
    Height: 0,
    EContact: '',
    DpName: '',
    DpType: '',
    DpId: '',
    Status: true
  }
  // console.log(Controllers)
  return helper.create(data,done)
})
const localLogin = new localStrategy(localOptions,function(req,email,password,done){
  const data = {
    email,
    password
  }
  return helper.login(data,done)
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
    helper.getUser(payload,done)
  }else{
    return done(null,false)
  }
})
passport.use('L-signup',LocalSignup)
passport.use('jwt',jwtlogin)
passport.use('L-login',localLogin)