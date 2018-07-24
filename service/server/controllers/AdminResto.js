const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//get file requitment
const fs = require('fs')
const path = require('path')
const del = require('del')
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config/config.json`)[env]
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  )
}
module.exports = {
  //get
  getTbRestoByuserID(req, res, next) {
    Models.Tb_Resto.findOne({ where: {Id_User: req.params.id},
      include: [
        {
          model: Models.Tb_Resto_Fac,
          as: 'Facility',
          attributes: ['Id','Icon','Id_Resto','Name']
        },
        {
          model: Models.Tb_Resto_Seat,
          as: 'Seats',
          attributes: ['Id','seatFrom','seatEnd','noSeat','Id_Resto']
        },
        {
          model: Models.Tb_Resto_Account,
          as: 'Account',
          attributes: ['Id','BankName','AccountNumber','Id_Resto']
        },
        {
          model: Models.Tb_Resto_Menu,
          as: 'FoodMenu',
          attributes: ['Id','Name','Type','Price','Description','PID','Pname','Ptype']
        },
        {
          model: Models.Tb_Gallery,
          as: 'Gallery',
          attributes: ['Id','Type','PID','Pname','Ptype','Id_Resto']
        }],
        order: [[{ model: Models.Tb_Gallery, as: 'Gallery' }, 'Type', 'ASC']]
    }).then(resto =>{
      resto.Gallery.forEach((val,index) => {
        let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
        val.dataValues.file = bitmap
      })
      resto.FoodMenu.forEach((val,index) => {
        if(val.PID){
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        }
      })
      res.status(200).send(resto)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getTbRestoByuserIDmin(req, res, next) {
    Models.Tb_Resto.findOne({ where: {Id_User: req.params.id},
      include: [
        {
          model: Models.Tb_Resto_Review,
          where: {Status: 0},     
          required: false,     
          as: 'Reviews',
          attributes: ['Id','comment','rate','userId','userName','userPID','Id_Resto']
        }
        ]
    }).then(resto =>{
      if(resto.Reviews.length !== 0){
        let tmp = 0
        resto.Reviews.forEach((val, index) => {
            Models.Tb_User.findOne({
            where: { Id: val.userId },
            attributes: ['Id', 'DpId', 'DpName', 'DpType']}).then(cb=>{
              if  (cb.DpId) {
                let bitmap = fs.readFileSync(path.join(`uploads/${cb.Id}/${cb.DpId}`))
                val.dataValues.file = bitmap
              }
              tmp+=1
              if(tmp === resto.Reviews.length){
                res.status(200).send(resto)        
              }
            })
        })
      } else {
        res.status(200).send(resto)        
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  //put
  saveRestoRate (req, res, next) {
    Models.Tb_Resto.update({Rate: req.params.rate}, { where: { Id: req.params.id } }).then(callback => {
      res.status(200).send({good: 'lul'})
    }).catch(err=> {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  updateRestoReview(req, res, next) {
    Models.Tb_Resto_Review.update({Status: 1}, {where: {Id: req.params.id}}).then(cb => {
      res.status(200).send({good: 'lul'})
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  updateTbResto(req, res, next) {
    let data = req.body
    Models.Tb_Resto.update(data, { where: { Id: data.Id } }).then(callback => {
      return updateTbRestoChild(Models.Tb_Resto_Fac, data.Facility, data.Id)
    }).then(callback => {
      return updateTbRestoChild(Models.Tb_Resto_Seat, data.Seats, data.Id)
    }).then(callback => {
      return updateTbRestoChild(Models.Tb_Resto_Account, data.Account, data.Id)
    }).then(callback => {
      res.status(200).send({good: 'lul'})
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  updateTbRestoGallery(req, res, next) {
    let data = req.body
    Models.Tb_Gallery.update(data, { where: { Id: data.Id } }).then(callback => {
      res.status(200).send({good: 'lul'})      
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  updateTbRestoMenu(req, res, next) {
    if(req.body.Id){
      let data = req.body
      Models.Tb_Resto_Menu.update(data,{where: {Id: data.Id}}).then(cb => {
        if(data.oldPID){
          del.sync([`uploads/${data.Id_Resto}/${data.oldPID}`]);
        }
        res.status(200).send(cb)
      })
    }else {
      let data = req.body
      data.Id = guid()
      Models.Tb_Resto_Menu.create(data).then(pro3 => {
        if(pro3.PID){
          let bitmap = fs.readFileSync(path.join(`uploads/${pro3.Id_Resto}/${pro3.PID}`))
          pro3.dataValues.file = bitmap
        }
        res.status(200).send(pro3)
      })
    }
  },
  getTbReservationConfirm(req,res,next) {
    Models.Tb_User_Reservation.findAll({where: {RestoId: req.params.id,Status: 1},
      include: [
        {
          model: Models.Tb_User_Reservation_Menu,
          as: 'FoodMenu',
          include: [{model: Models.Tb_Resto_Menu, as: 'Menu'}]
        },
        {
          model: Models.Tb_User_Reservation_Upload,
          as: 'Upload'
        }
      ]
    }).then(cb => {
      cb.forEach((val,index) => {
        let bitmap = fs.readFileSync(path.join(`uploads/${val.Id}/${val.Upload.PID}`))
        val.dataValues.file = bitmap
      })
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  getTbReservationSchedule(req,res,next) {
    let data = req.body
    console.log(data)
    Models.Tb_User_Reservation_Schedule.findAll({where: {Status: 0, Id_Resto: data.RestoId},
      include: [
        {
          model: Models.Tb_User_Reservation,
          as: 'Reservation',
          where: sequelize.where(sequelize.fn('date', sequelize.col('reserveDate')),'=',sequelize.fn('date', data.date)),
          include: [
            {
              model: Models.Tb_User_Reservation_Menu,
              as: 'FoodMenu',
              include: [{model: Models.Tb_Resto_Menu, as: 'Menu'}]
            }]
        },
        {
          model: Models.Tb_Resto_Seat,
          as: 'Seats'
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto'
        }
      ]
    }).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  getTbReservationSchedule2(req,res,next) {
    let data = req.body
    console.log(data)
    Models.Tb_User_Reservation_Schedule.findAll({where: {Status: {$ne: 0}, Id_Resto: data.RestoId},
      include: [
        {
          model: Models.Tb_User_Reservation,
          as: 'Reservation',
          where: sequelize.where(sequelize.fn('date', sequelize.col('reserveDate')),'=',sequelize.fn('date', data.date)),
          include: [
            {
              model: Models.Tb_User_Reservation_Menu,
              as: 'FoodMenu',
              include: [{model: Models.Tb_Resto_Menu, as: 'Menu'}]
            }]
        },
        {
          model: Models.Tb_Resto_Seat,
          as: 'Seats'
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto'
        }
      ]
    }).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  updateTbReservationConfirm(req,res,next) {
    let data = req.body
    Models.Tb_User_Reservation.update({Status: req.params.status, rejectNote: data.Note, PID: 'new'},{where: {Id: req.params.id}}).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  updateTbReservationSchedule(req,res,next) {
    Models.Tb_User_Reservation.update({Status: 5},{where: {Id: req.params.reserveId}}).then(cb => {
      Models.Tb_User_Reservation_Schedule.update({Status: 1},{where: {Id: req.params.scheduleId}}).then(cb2 => {
        res.status(200).send(cb)
      })
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  updateTbRestoGalleryNormal(req, res, next) {
    Models.Tb_Gallery.update({Type: 'normal'}, { where:{ Id: { [Op.in]: req.body } } }).then(resp => {
      console.log('lul')
      res.status(200).send({good: 'lul'})
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err})
    })
  },
  deleteTbRestoGallery(req, res, next) {
    let data = req.body
    Models.Tb_Gallery.destroy({ where: { Id: data.Id } }).then(callback => {
      del.sync([`uploads/${data.Id_Resto}/${data.PID}`]);
      res.status(200).send({good: 'lul'})      
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  deleteTbRestoMenu(req, res, next) {
    if(req.params.pid)
      del.sync([`uploads/${req.params.restoid}/${req.params.pid}`]);
    Models.Tb_Resto_Menu.destroy({ where: { Id: req.params.id } }).then(callback => {
      res.status(200).send({good: 'lul'})
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  }
}
function updateTbRestoChild(entity, list, restoId) {
  console.log(list)
  let listData = list
  let destroy = []
  return entity.findAll({ where: { Id_Resto: restoId }, attributes: ['Id'] })
  .then(seat => { // Get ID from Current Data on Database
    for (let n in seat) {
      let tmp = listData.findIndex(x => x.Id == seat[n].Id) //Compare Data from database with List
      if(tmp === -1) // If not found then deleted
        destroy.push(seat[n].Id)
      else // else found Remove data from List 
        listData.splice(tmp, 1)
    }
    return entity.bulkCreate(listData)
  }).then(res => {
    return entity.destroy({ where: { Id: { [Op.in]: destroy } } })
  })
}
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}