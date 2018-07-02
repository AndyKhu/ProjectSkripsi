const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//get file requitment
const fs = require('fs')
const path = require('path')
const del = require('del')
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
          attributes: ['Id','Name','Price','Description','PID','Pname','Ptype']
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
        let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
        val.dataValues.file = bitmap
      })
      res.status(200).send(resto)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  //put
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
    Models.Tb_Resto_Menu.create(req.body).then(pro3 => {
      let bitmap = fs.readFileSync(path.join(`uploads/${pro3.Id_Resto}/${pro3.PID}`))
      pro3.dataValues.file = bitmap
      res.status(200).send(pro3)
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