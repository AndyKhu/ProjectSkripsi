const passportService = require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt',{session: false})
const Signup = passport.authenticate('L-signup',{session: false})
const Login = passport.authenticate('L-login',{session: false})
const jwt = require('jwt-simple')
const config = require('../config/sconfig')
const Models = require('../models')
const bcrypt = require('bcrypt-nodejs')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vamkre01@gmail.com',
    pass: 'Andy159753'
  }
})

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
  verification(req, res,next) {
    if(req.params.id.toString() === '1') {
      Models.Tb_User.findOne({where: {Id: req.params.user}}).then(user => {
        if(!user) res.status(400).send({message: 'User Not Found'})
        else {
          Models.Tb_User.update({Status: true},{where: {Id: req.params.user}}).then(cb => {
            res.status(200).send({})
          })
        }
      })
    } else {
      Models.Tb_Request_AdminResto.findOne({where: {Id: req.params.user}}).then(user => {
        if(!user) res.status(400).send({message: 'User Not Found'})
        else {
          Models.Tb_Request_AdminResto.update({Status: 1},{where: {Id: req.params.user}}).then(cb => {
            res.status(200).send({})
          })
        }
      })
    }
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
      Status: 3,
      PID: raw.PID,
      Pname: raw.Pname,
      Ptype: raw.Ptype,
      PID2: raw.PID2,
      PID3: raw.PID3
    }
    Models.Tb_Request_AdminResto.findOne({where: { Email: data.Email }})
    .then(user => {
      if(user){
        res.status(400).send({ message: 'That Email is already taken'})
      }else{
        Models.Tb_Request_AdminResto.create(data)
        .then(User => {
          let mailOptions = {
            from: 'vamkre01@gmail.com',
            to: data.Email,
            subject: 'Register Verification',
            html: 
            `
            <div style="text-align:center;border:1px solid #dedede">
              <div style="color:#FAFAFA;font-weight:bold;background:#03A9F4;font-size:18px;padding:10px">
                Rabbito
              </div>
              <h2 style="color:#424242">Hi ${data.fullName},</h2>
              <span style="color:#757575;font-size:14px">Thanks for signin up for Rabbito. we're very excited to have you on our app.<br>To get started using Rabbito, please confirm your account below :<br></span>
              <div style="padding:15px">
                <a href="http://localhost:3091/confirm/2/${data.Id}">
                  <button type="button" style="cursor:pointer;background-color:#4CAF50;border:none;color:white;padding:10px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px">Confirm Your Account</button>
                </a>
              </div>
              <div style="padding:15px;background:#EEEEEE;">
                <span style="color:#757575;font-size:12px">if you're having trouble clicking the "confirm your account" button, copy and paste the url bellow into your web browser</span><br>
                <a href="http://localhost:3091/confirm/2/${data.Id}">http://localhost:3091/confirm/2/${data.Id}</a>
              </div>
            </div>
            `
          }
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          })
          res.send(User)
        })
      }
    }).catch(error => {
      res.status(400).send({ message: 'Something Error Tell Administrator'})
    })
  }
}