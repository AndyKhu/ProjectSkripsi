const passport = require('passport')
const Tb_User = require('../models').Tb_User
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
    Type: req.body.Type,
    Age: 0,
    Weight: 0,
    Height: 0,
    EContact: '',
    DpName: '',
    DpType: '',
    DpId: '',
    Status: true
  }
  Tb_User.findOne({where: { Email: data.Email }})
  .then(User => {
    console.log("lol")
    if(user){
      return done(null, false,{ message: 'That Email is already taken'})
    }else{
      Tb_User.create(data)
      .then(User => {
        if(!User){
          return done(null,false)
        }
        if(User){
          return done(null,User)
        }
      })
    }
  }).catch(error => {console.log("lols");return done(null,false,{ message: 'Something Error Tell Administrator'})})
})

// const localLogin = new localStrategy(localOptions,function(req,email,password,done){
//     User.findOne({ where: {email: email} })
//     .then(user => {
//         if(!user){return done(null,false)}
//         else{
//             bcrypt.compare(password,user.password,function(err,isMatch){
//                 if(err){return done(err)}
//                 if(!isMatch){return done(null,false)}
//                 return done(null, user)
//             })
//         }
//     })
//     .catch(error => {return done(error)})
// })

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
}

const jwtlogin = new JwtStrategy(jwtOptions, function(payload,done){
    Tb_User.findById(payload.sub)
    .then(user => {
        if(!user){return done(null,false)}
        else{return done(null,user)}
    })
    .catch(error => {return done(error,false)})
})
passport.use('L-signup',LocalSignup)
passport.use('jwt',jwtlogin)
// passport.use(localLogin)
