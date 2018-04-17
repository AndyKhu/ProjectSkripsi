const Tb_User = require('../models').Tb_User
const jwt = require('jwt-simple')
const config = require('../config/sconfig')
const bcrypt = require('bcrypt-nodejs')
function tokenForUser(user){
  const timestamp = new Date().getTime()
  const ax = {sub: user.Id, iat: timestamp}
  return jwt.encode(ax,config.secret)
}
module.exports = {
  signup(req,res,next){
    res.send({token:tokenForUser(req.user),user:req.user})
  },
  signin(req,res,next){
    res.send({token:tokenForUser(req.user),user:req.user})
  },
  login (data,done) {
    Tb_User.findOne({ where: {Email: data.email} })
    .then(user => {
        if(!user){return done(null,false)}
        else{
            bcrypt.compare(data.password,user.Password,function(err,isMatch){          
                if(err){return done(err)}
                if(!isMatch){return done(null,false)}
                return done(null, user)
            })
        }
    })
    .catch(error => {return done(error)})
  },
  create(data,done) {
    Tb_User.findOne({where: { Email: data.Email }})
    .then(user => {
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
    }).catch(error => {return done(null,false,{ message: 'Something Error Tell Administrator'})})
  },
  guid(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
}