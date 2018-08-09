const Models = require('../models')
const UPLOAD_PATH = 'uploads'
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const getDirName = path.dirname
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!fs.existsSync(`${UPLOAD_PATH}`)) {
      fs.mkdirSync(`${UPLOAD_PATH}`)
    }
    if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.direct}`)) {
      fs.mkdirSync(`${UPLOAD_PATH}/${req.params.direct}`)
    }
    cb(null, `${UPLOAD_PATH}/${req.params.direct}/`)
  },
  filename: function (req, file, cb) {
    let fileId = guid()
    if (req.params.Id !== undefined && req.params.Id !== null && req.params.Id !== 'null'){
      fileId = req.params.id
    }
    cb(null, fileId)
  }
})
var upload = multer({ storage: storage })

module.exports = {
  uploadImgBase64(req,res,next) {
    let filename = guid()
    let base64Data = req.body.src.replace(/^data:image\/jpeg;base64,/,"")
    // if (!fs.existsSync(`./uploads`)) {
    //   fs.mkdirSync(`./uploads`)
    // }
    // console.log(req.params.direct)
    // if (!fs.existsSync(`./uploads/${req.params.direct}`)) {
    //   console.log(req.params.direct)
    //   fs.mkdirSync(`./uploads/${req.params.direct}`)
    // }
    let url = `./uploads/${req.params.direct}/${filename}`

    mkdirp(getDirName(url), function (err) {
      if (err) {
        console.log(err)
        res.status(400).send({PID: filename}) 
      } else {
        fs.writeFile(url,base64Data,'base64', function(err){
          if(err) {
            console.log(err)
            res.status(400).send({PID: filename}) 
          }
          else {
            res.status(200).send({PID: filename})    
          }
        })
      }
    });
  },
  async uploadImg(req, res, next) {
    upload.single('img')(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        res.sendStatus(400)
      }
      res.json({PID: req.file.filename, Pname: req.file.originalname, Ptype: req.file.mimetype})
    })
  },
  async uploadMultiImgResto(req, res, next) {
    let data = []
    upload.array('img',100)(req, res, function (err) {
      if (err) {
        // An error occurred when uploading
        res.status(400).send({ error: err })
      }
      req.files.forEach((val,index) => {
        let bitmap = fs.readFileSync(path.join(`uploads/${req.params.direct}/${val.filename}`))
        data.push({Id: guid(),Type: 'normal',PID: val.filename,Pname: val.originalname,Ptype: val.mimetype,Id_Resto: req.params.direct,file: bitmap})
      })
      Models.Tb_Gallery.bulkCreate(data).then(cb => {
        res.status(200).send(data)
      }).catch(err => {
        res.status(400).send({ error: err })
      })
    })
  },
  getSingleImg (req, res, next) {
    if (!fs.existsSync(`uploads/${req.params.direct}`) && !fs.existsSync(`uploads/${req.params.direct}/${req.params.id}`)) {
      res.status(400).send({error: 'not found'})
    } else {
      let bitmap = fs.readFileSync(path.join(`uploads/${req.params.direct}/${req.params.id}`))
      res.status(200).send({file: bitmap})
    }
  }
  
}

function guid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}