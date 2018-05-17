const Tb_Resto = require('../models').Tb_Resto

function guid(){
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}

module.exports = {
  RestoSave(req,res,next) {
    let data = req.body
    data.Id = data.Id == "" ? guid():data.Id
    Tb_Resto.findOrCreate({where: { Id: data.Id }, defaults: data})
    .spread(function(resto, created) {
      if(created){
        res.status(200).send({Resto: resto})
      }else{
        Tb_Resto.update( data , {where: { Id: data.Id }})
          .then(result =>
            res.status(200).send({Resto: result})
          )
          .catch(err =>
            res.status(400).send({error : err})
          )
      }
    }).catch(error => { res.status(400).send({error : error}) })
  }
}