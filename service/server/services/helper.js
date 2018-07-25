const Tb_User = require('../models').Tb_User
const Tb_User_Favorite = require('../models').Tb_User_Favorite
const Tb_User_Reservation = require('../models').Tb_User_Reservation
const bcrypt = require('bcrypt-nodejs')
module.exports = {
  create(data,done) {
    console.log('lul')
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
          console.log(data.password)
          if(status) {return done(null, user)}
          else {return done(null,false)}
        }
    })
    .catch(error => {return done(error)})
  }
}