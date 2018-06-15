const fs = require('fs')
const path = require('path')
const del = require('del')
const Tb_Resto = require('../models').Tb_Resto
const Tb_Resto_Fac = require('../models').Tb_Resto_Fac
const Tb_Gallery = require('../models').Tb_Gallery
const Tb_Resto_Menu = require('../models').Tb_Resto_Menu
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = {
  getImage (req, res, next) {
    let a = []
    let data = req.body
    for (let key in data) {
      let obj = data[key]
      res.set({'Content-Type': obj.Ptype})
      let bitmap = fs.readFileSync(path.join(`uploads/${req.params.id}/${obj.Type}/`, obj.PID))
      a.push({data:bitmap , type:obj.Ptype, id: obj.Id ,name: obj.Pname, PID: obj.PID})
    }
    res.json(a)
  },
  getImgById (req, res, next) {
    res.set({'Content-Type': 'image/jpeg'})
    let bitmap = fs.readFileSync(path.join(`uploads/${req.params.id}/${req.params.type}/${req.params.fileid}`))
    res.json({data:bitmap})
  },
  getImageMenu (req, res, next) {
    let a = []
    let data = req.body
    for (let key in data) {
      let obj = data[key]
      res.set({'Content-Type': obj.Ptype})
      let bitmap = fs.readFileSync(path.join(`uploads/${req.params.id}/1/`, obj.PID))
      a.push({
        Id: obj.Id,
        Name: obj.Name,
        Price: obj.Price,
        Description: obj.Description,
        Type: obj.Type,
        PID: obj.PID,
        Pname: obj.Name,
        Ptype: obj.Ptype,
        Id_Resto: obj.Id_Resto,
        Img:bitmap})
    }
    res.json(a)
  },
  delImage (req, res, next) {
    let data = req.body
    let opt = data.map((obj) => { return obj.Id })
    Tb_Gallery.destroy({
      where: {
        Id: { [Op.in]: opt }
      }
    })
    for(let n in data){
      del.sync([`uploads/${req.params.id}/${req.params.type}/${data[n].fileId}`]);
    }
    res.sendStatus(200)
  },
  getlistResto (req, res, nex) {
    Tb_Resto.all({
      include: [
        {
          model: Tb_Resto_Fac,
          attributes: ['Id','Icon','Id_Resto','Name']
        },
        {
          model: Tb_Gallery,
          attributes: ['Id','Type','PID','Pname','Ptype']
        },
        {
          model: Tb_Resto_Menu,
          attributes: ['Id','Name','Price','Description','PID','Pname','Ptype','Type']
        }
      ]
    }).then(data => {
      for(let n in data){  
        const value = data[n]
        if (value.Tb_Galleries === null || value.Tb_Galleries === undefined || value.Tb_Galleries.length === 0) {
          let cok = fs.readFileSync(path.join(`uploads/tmp.png`))
          data[n].dataValues.src = cok
        } else {
          let bitmap = fs.readFileSync(path.join(`uploads/${data[n].Id}/0/${data[n].Tb_Galleries[0].PID}`))
          data[n].dataValues.src = bitmap
          for(let x in data[n].Tb_Galleries){
            let xbitmap = fs.readFileSync(path.join(`uploads/${data[n].Id}/0/${data[n].Tb_Galleries[x].PID}`))
            data[n].Tb_Galleries[x].dataValues.src = xbitmap
          }
        }
        if (value.Tb_Resto_Menus === null || value.Tb_Resto_Menus === undefined || value.Tb_Resto_Menus.length === 0) {
          // data[n].dataValues.src = []
        } else {
          for(let ex in value.Tb_Resto_Menus){
            let exbitmap = fs.readFileSync(path.join(`uploads/${value.Id}/1/${value.Tb_Resto_Menus[ex].PID}`))
            value.Tb_Resto_Menus[ex].dataValues.src = exbitmap
          }
        }
      }
      res.send({item:data})
    }).catch(err => {
      res.send({item: []})
    })
  }
}