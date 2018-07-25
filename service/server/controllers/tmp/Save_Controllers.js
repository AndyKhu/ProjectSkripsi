const Tb_Resto = require('../models').Tb_Resto
const Tb_Resto_Fac = require('../models').Tb_Resto_Fac
const Tb_Resto_Menu = require('../models').Tb_Resto_Menu
const Tb_Gallery = require('../models').Tb_Gallery
const Sequelize = require('sequelize')
const Op = Sequelize.Op
var qs = require('querystring');
//Upload Requitment
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const del = require('del')
const UPLOAD_PATH = 'uploads'
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(`${UPLOAD_PATH}`)) {
      fs.mkdirSync(`${UPLOAD_PATH}`)
    }
    if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}`)) {
      fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}`)
    }
    if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)) {
      fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)
    }
    cb(null, `${UPLOAD_PATH}/${req.params.id}/${req.params.type}/`)
  },
  filename: function (req, file, cb) {
    cb(null, req.params.name)
  }
})
var upload = multer({ storage: storage })

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
// function facpromise(restoId, data) {
//   return Tb_Resto_Fac.findAll({ where: { Id_Resto: restoId }, attributes: ['id'] }).then(facs => {
//     for (let n in facs) {
//       if(data.findIndex(x => x.Id == facs[n].Id) === -1){
//         Tb_Resto_Fac.
//       }
//     }
//   })
// }

module.exports = {
  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  },
  RestoSave(req, res, next) {
    let data = req.body
    data.Id = data.Id == "" ? guid() : data.Id
    Tb_Resto.findOrCreate({ where: { Id: data.Id }, defaults: data })
      .spread(function (resto, created) {
        if (created) {
          res.status(200).send({ Resto: resto })
        } else {
          Tb_Resto.update(data, { where: { Id: data.Id } })
            .then(result =>
              res.status(200).send({ Resto: result })
            )
            .catch(err =>
              res.status(400).send({ error: err })
            )
        }
      }).catch(error => { res.status(400).send({ error: error }) })
  },
  RestoSave2(req, res, next) {
    let data = req.body
    Tb_Resto.create(data, { include: [{ model: Tb_Resto_Fac }] }
    ).then((data) => {
      res.status(200).send(data)
    }).catch(err => {
      res.status(400).send({ error: err })
    }
      )
  },
  RestoUpdate(req, res, next) {
    let data = req.body
    let restoId = data.Id
    Tb_Resto.update(data, { where: { Id: restoId } }).then(result => {
      Tb_Resto_Fac.findAll({ where: { Id_Resto: restoId }, attributes: ['Id'] })
        .then(facs => {
          // let tmp = $.map(facs, function (value, index) { return [value.id] })
          let add = []
          let del = []
          let update = []
          for (let n in facs) {
            let tmp = data.Tb_Resto_Facs.findIndex(x => x.Id == facs[n].Id);
            if (tmp !== -1) {
              update.push(data.Tb_Resto_Facs[tmp])
              data.Tb_Resto_Facs.splice(tmp, 1)
            } else {
              del.push(facs[n].Id)
            }
          }
          add = data.Tb_Resto_Facs
          Tb_Resto_Fac.bulkCreate(add)
          // for(let x in update){
          //   Tb_Resto_Fac.update({Name: update[x].Name,Icon: update[x].Icon},{where: {Id: update[x].Id}})
          // }
          Tb_Resto_Fac.destroy({
            where: {
              Id: { [Op.in]: del }
            }
          })
          res.status(200).send({ Resto: 'Success' })
        }).catch(err =>
          res.status(400).send({ error: err })
        )
    }).catch(err =>
      res.status(400).send({ error: err })
      )
  },
  async uploadImg(req, res, next) {
    let data = []
    for (let n in req.files) {
      var obj = req.files[n]
      data.push({
        Id: guid(),
        Type: req.params.type,
        PID: obj.filename,
        Pname: obj.originalname,
        Ptype: obj.mimetype,
        Id_Resto: req.params.id
      })
    }
    Tb_Gallery.bulkCreate(data)
    res.status(200).send({ file: data })
  },
  saveRestoMenu(req, res, next) {
    let data = req.body
    Tb_Resto_Menu.create(data)
      .then((data) => {
        res.status(200).send({ data: data })
      }).catch(err => {
        res.status(400).send({ error: err })
      })
  },
  async uploadImgMenu(req, res, next) {
    upload.single('img')(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        return res.sendStatus(400)
      }
      res.sendStatus(200)
    })
  },
  deleteMenu (req, res, next) {
    const fileId = req.body.PID
    const restoId = req.body.Id_Resto
    Tb_Resto_Menu.destroy({
      where: {
        Id: req.body.Id
      }
    }).then(data => {
      del.sync([`uploads/${restoId}/1/${fileId}`]);
      res.status(200).send({ data: 'good'})
    }).catch(err => {
      res.status(400).send({ error: err })
    })
  }
}