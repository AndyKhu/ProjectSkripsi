const Tb_User = require('../models').Tb_User
const Tb_User_Favorite = require('../models').Tb_User_Favorite
const Tb_User_Reservation = require('../models').Tb_User_Reservation
const bcrypt = require('bcrypt-nodejs')
const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vamkre01@gmail.com',
    pass: 'Andy159753'
  }
})
module.exports = {
  create(data,done) {
    Tb_User.findOne({where: { Email: data.Email }})
    .then(user => {
      if(user){
        return done(null, false,{ message: 'That Email is already taken'})
      }else{
        data.Status = false
        Tb_User.create(data)
        .then(User => {
          if(!User){
            return done(null,false)
          }
          if(User){
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
                  <a href="http://localhost:3091/confirm/1/${data.Id}">
                    <button type="button" style="cursor:pointer;background-color:#4CAF50;border:none;color:white;padding:10px 32px;text-align:center;text-decoration:none;display:inline-block;font-size:16px">Confirm Your Account</button>
                  </a>
                </div>
                <div style="padding:15px;background:#EEEEEE;">
                  <span style="color:#757575;font-size:12px">if you're having trouble clicking the "confirm your account" button, copy and paste the url bellow into your web browser</span><br>
                  <a href="http://localhost:3091/confirm/1/${data.Id}">http://localhost:3091/confirm/1/${data.Id}</a>
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
            return done(null,User)
          }
        })
      }
    }).catch(error => {return done(null,false,{ message: 'Something Error Tell Administrator'})})
  },
  getUser (payload,done) {
    Tb_User.findById(payload.sub,{
      include: [
      {
        model: Tb_User_Reservation,
        as: 'Reservation',
        // where: {PID: 'new'},
        required: false
      },
      {
        model: Tb_User_Favorite,
        as: 'UserFavorite'
      }]
    })
    .then(user => {
        if(!user){return done(null,false)}
        else{return done(null,user)}
    })
    .catch(error => {return done(error,false)})
  },
  login (data,done) {
    Tb_User.findOne(
      { 
        where: {Email: data.email, Status: true},
        include: [
          {
            model: Tb_User_Reservation,
            as: 'Reservation',
            where: {PID: 'new'},
            required: false
          },
          {
            model: Tb_User_Favorite,
            as: 'UserFavorite'
          }]
      })
    .then(user => {
        if(!user){return done(null,false)}
        else{
          let status = bcrypt.compareSync(data.password, user.Password)
          if(status) {return done(null, user)}
          else {return done(null,false)}
        }
    })
    .catch(error => {return done(error)})
  }
}