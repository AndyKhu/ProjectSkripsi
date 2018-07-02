const Models = require('../models')
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
  //get
  getTbRequestAdminInProgress(req, res, next) {
    Models.Tb_Request_AdminResto.findAll({
      where: {  Status: 1 },
      attributes: ['Id','Email','fullName','Password','restoName','PID','Pname','Ptype']
    }).then(list => {
      list.forEach(obj => { 
        res.set({'Content-Type': obj.Ptype})
        let bitmap = fs.readFileSync(path.join(`uploads/reqAdmin/`, obj.PID))
        obj.dataValues.Img = bitmap
      })
      res.json(list)
    }).catch(err =>
      res.status(400).send({ error: err })
    )
  },
  getTbUserAll(req, res, next) {
    Models.Tb_User.findAll({
      attributes: ['Id','fullName','Email','Type','Status'],
      order: [['Status','DESC'],['Type']]
    }).then(list => {
      res.json(list)
    }).catch(err =>
      res.status(400).send({error: err})
    )
  },
  //put
  updateTbUser(req, res, next) {
    let data = req.body
    Models.Tb_User.update({Email:data.Email, fullName: data.fullName, Type: data.Type, Status: data.Status},{where: {Id: data.Id }}).then(pro => {
      res.sendStatus(200)
    }).catch(err => {
      res.sendStatus(400)
    })
  },
  ApproveReqAdmin(req, res, next) {
    // console.log(req.body)
    let data = req.body
    let User = {Id: data.Id, fullName: data.fullName, Email: data.Email, Password: data.Password,Type: 'AdminResto', Status: true}
    Models.Tb_Request_AdminResto.update({Status:2},{where: {Id: data.Id }}).then(pro => {
      Models.Tb_User.create(User).then(pro2 => {
        Models.Tb_Resto.create({Id: guid(), Name: data.restoName, Id_User: data.Id}).then(pro3 => {
          res.sendStatus(200)
        })
      })
    }).catch(err =>{
      res.sendStatus(400)
    })
  },
  RejectReqAdmin(req, res, next) {
    let data = req.body
    Models.Tb_Request_AdminResto.update({Status:0},{where: {Id: data.Id }}).then(pro => {
      res.sendStatus(200)
    }).catch(err => {
      res.sendStatus(400)
    })
  }
}