const passportService = require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt',{session: false})
const Signup = passport.authenticate('L-signup',{session: false})
const Login = passport.authenticate('L-login',{session: false})
const jwt = require('jwt-simple')
const config = require('../config/sconfig')
const Models = require('../models')
const bcrypt = require('bcrypt-nodejs')

function tokenForUser(user){
  const timestamp = new Date().getTime()
  const ax = {sub: user.Id, iat: timestamp}
  return jwt.encode(ax,config.secret)
}

module.exports = {
  requireAuth,
  Signup,
  Login,
  checkAuth (req,res,next){
    res.send({user:req.user})
  },
  signupcb(req,res,next){
    res.send({token:tokenForUser(req.user),user:req.user})
  },
  signincb(req,res,next){
    res.send({token:tokenForUser(req.user),user:req.user})
  },
  changePass(req,res,next){
    let data = req.body
    Models.Tb_User.findOne(
      { 
        where: {Id: data.Id}
      })
    .then(user => {
        if(!user){
          res.status(400).send({ message: 'User Not Found'})
        }
        else{
          console.log(data)
          let newPass = bcrypt.hashSync(data.newpass, bcrypt.genSaltSync(8), null)
          let status = bcrypt.compareSync(data.pass, user.Password)
          let status2 = bcrypt.compareSync(data.newpass, user.Password)
          if (status2){
            res.status(200).send({ status: false , message: 'New Password & Current Password can`t be same'})
          }
          else if(status) {
            Models.Tb_User.update({
              Password: newPass
            },{where: {Id: data.Id}}).then(data => {
              res.status(200).send({status: true})
            }).catch(err => {
              console.log(err)
              res.status(400).send({ message: 'error'})
            })
          }
          else {
            res.status(200).send({ status: false , message: 'Password Not Match'})
          }
        }
    })
  },
  createReqAdmin (req,res,next) {
    let raw = req.body
    const passwordG = bcrypt.hashSync(raw.Password, bcrypt.genSaltSync(8), null)
    let data = {
      Id: raw.Id,
      Email: raw.Email,
      fullName: raw.fullName,
      Password: passwordG,
      restoName: raw.restoName,
      Status: 1,
      PID: raw.PID,
      Pname: raw.Pname,
      Ptype: raw.Ptype
    }
    Models.Tb_Request_AdminResto.findOne({where: { Email: data.Email }})
    .then(user => {
      if(user){
        res.status(400).send({ message: 'That Email is already taken'})
      }else{
        Models.Tb_Request_AdminResto.create(data)
        .then(User => {
          res.send(User)
        })
      }
    }).catch(error => {
      res.status(400).send({ message: 'Something Error Tell Administrator'})
    })
  }
}