const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
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
//for read Image
const fs = require('fs')
const path = require('path')
//default
function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
module.exports = {
  getListRestourant(req, res, next){
    sequelize.query(`select a.*,c."PID" from public."Tb_Restos" a join public."Tb_Users" b on a."Id_User" = b."Id" left join public."Tb_Galleries" c on a."Id" = c."Id_Resto" where b."Status" and (c."Type" = 'both' or c."Type" = 'default')`, { type: Sequelize.QueryTypes.SELECT})
    .then(resto => {
      resto.forEach((val,index) => {
        let bitmap = fs.readFileSync(path.join(`uploads/${val.Id}/${val.PID}`))
        val.file = bitmap
      })
      res.status(200).send(resto)
      // We don't need spread here, since only the results will be returned for select queries
    }).catch(err => {
      console.log(err)
    })
  },
  getRestoDetailmin(req, res, next) {
    Models.Tb_Resto.findOne({ where: {Id: req.params.id},
      include: [
        {
          model: Models.Tb_Resto_Account,
          as: 'Account',
          attributes: ['Id','BankName','AccountNumber','Id_Resto']
        },
        {
          model: Models.Tb_Resto_Menu,
          as: 'FoodMenu',
          attributes: ['Id','Name','Price','Description','PID','Pname','Ptype']
        }]
    }).then(resto =>{
      if(resto === null) {
        res.status(401).send({ err : 'not found'})
      } else {
        resto.FoodMenu.forEach((val,index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        res.status(200).send(resto)
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getReservationHistory (req, res, next) {
    sequelize.query(`select a.*,a."reserveDate"+ (a."Duration" * interval '1 minute')  as "DurationC",b."Name" as "RestoName",c."PID" from public."Tb_User_Reservations" a join public."Tb_Restos" b on a."RestoId" = b."Id" join public."Tb_Galleries" c on c."Id_Resto" = b."Id" and (c."Type" = 'both' or c."Type" = 'default')`, { type: Sequelize.QueryTypes.SELECT})
    .then(listH => {
      listH.forEach((val,index) => {
        if (val.PID) {
          let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${val.PID}`))
          val.file = bitmap
        }
      })
      res.status(200).send(listH)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getRestoDetail(req, res, next) {
    Models.Tb_Resto.findOne({ where: {Id: req.params.id},
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
          model: Models.Tb_Resto_Review,
          where: {Status: {[Op.ne]: 2}},   
          required: false,       
          as: 'Reviews',
          attributes: ['Id','comment','rate','userId','userName','userPID','Id_Resto']
        },
        {
          model: Models.Tb_Resto_Menu,
          as: 'FoodMenu',
          attributes: ['Id','Name','Price','Description','PID','Pname','Ptype']
        },
        {
          model: Models.Tb_Gallery,
          as: 'Gallery',
          attributes: ['Id','Type','PID','Pname','Ptype','Id_Resto']
        }],
        order: [[{ model: Models.Tb_Gallery, as: 'Gallery' }, 'Type', 'ASC']]
    }).then(resto =>{
      if(resto === null) {
        res.status(401).send({ err : 'not found'})
      } else {
        resto.Gallery.forEach((val,index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        resto.FoodMenu.forEach((val,index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        res.status(200).send(resto)
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  saveRestoReview (req, res, next) {
    let data = req.body
    data.Id = guid()
    Models.Tb_Resto_Review.create(data).then(pro3 => {
      res.status(200).send(pro3)
    }).catch(err => {
      console.log(err)
      res.status(400).send({errmsg: 'Failed to Comment'})
    })
  },
  saveRestoReserve (req, res, next) {
    let data = req.body
    data.Id = guid()
    let foodList = []
    data.FoodMenu.forEach((val,index) => {
      foodList.push({Id: guid(), Amount: val.Amount, MenuId: val.Id, Id_Reserve: data.Id})
    })
    Models.Tb_User_Reservation.create(data).then(pro3 => {
      Models.Tb_User_Reservation_Menu.bulkCreate(foodList).then(pro => {
        data.FoodMenu = foodList
        res.status(200).send(data)
      })
    }).catch(err => {
      console.log(err)
      res.status(400).send({errmsg: 'Failed to Comment'})
    })
  },
  updateProfile (req, res, next) {
    let data = req.body
    if(data.upload)
      del.sync([`uploads/${data.Id}/${data.delete}`])
    Models.Tb_User.update({
      fullName: data.fullName,
      Phone: data.Phone,
      Age: data.Age,
      Weight: data.Weight,
      Height: data.Height,
      DpName: data.DpName,
      DpId: data.DpId,
      DpType: data.DpType
    },
    {where: {Id: data.Id}}).then(hsl => {
      res.status(200).send(hsl)
    }).catch(err => {
      console.log(err)
      res.status(400).send({errmsg: 'Failed to Update'})
    })
  }
}