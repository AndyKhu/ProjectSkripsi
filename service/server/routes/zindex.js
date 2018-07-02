const UserC = require('../controllers').UserC
const SaveC = require('../controllers').SaveC
const GetC = require('../controllers').GetC
const passportService = require('../services/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt',{session: false})
const Signup = passport.authenticate('L-signup',{session: false})
const Login = passport.authenticate('L-login',{session: false})
//Upload Requitment
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const del = require('del')
const UPLOAD_PATH = 'uploads'
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
    if (!fs.existsSync(`${UPLOAD_PATH}`)){
      fs.mkdirSync(`${UPLOAD_PATH}`)
    }
	  if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}`)){
		  fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}`)
	  }
	  if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)){
		  fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)
	  }
	  cb(null, `${UPLOAD_PATH}/${req.params.id}/${req.params.type}/`)
	},
	filename: function (req, file, cb) {
	  cb(null, SaveC.guid())
	}
  })
var upload = multer({ storage: storage })

module.exports = (app) => {
  //AUTH
  app.get('/checkAuth',requireAuth,UserC.checkAuth)
  app.post('/api/signup',Signup,UserC.signup)
  app.post('/api/login',Login,UserC.signin)
  //get
  app.get('/api/get/listrestourant',GetC.getlistResto)
  app.post('/api/get/imgbyid/:id/:type/:fileid',GetC.getImgById)
  //save
  app.post('/api/save/resto',SaveC.RestoSave2)
  app.post('/api/save/restoMenu',SaveC.saveRestoMenu)
  //update
  app.put('/api/update/resto',SaveC.RestoUpdate)  
  //Delete
  app.post('/api/del/restoMenu',SaveC.deleteMenu)
  //Image API
  app.post('/api/imgm/upload/:id/:type/:name',SaveC.uploadImgMenu)
  // app.post('/api/imgm/del/:id/:type/:name',SaveC.delImgMenu)
  app.post('/api/getuploadMenu/:id',GetC.getImageMenu)

  app.post('/api/img/upload/:id/:type',upload.array('img',99),SaveC.uploadImg)
  app.post('/api/getupload/:id',GetC.getImage)
  app.post('/api/delete/upload/:id/:type',GetC.delImage)
}