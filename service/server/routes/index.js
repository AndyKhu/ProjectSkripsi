const Auth = require('../controllers').Auth
const SystemAdmin = require('../controllers').SystemAdmin
const AdminResto = require('../controllers').AdminResto
const Uploaders = require('../controllers').Uploaders
const Member = require('../controllers').Member

module.exports = (app) => {
  //AUTH
  app.get('/checkAuth',Auth.requireAuth,Auth.checkAuth)
  app.post('/api/signup',Auth.Signup,Auth.signupcb)
  app.post('/api/login',Auth.Login,Auth.signincb)
  app.post('/api/createReqAdmin',Auth.createReqAdmin)
  
  // member
  app.get('/api/getListRestourant',Member.getListRestourant)
  app.get('/api/getRestoDetail/:id',Member.getRestoDetail)
  app.get('/api/getRestoDetailmin/:id',Member.getRestoDetailmin)

  //Admin Resto
  app.get('/api/getTbRestoByuserID/:id',AdminResto.getTbRestoByuserID)
  app.put('/api/updateTbResto',AdminResto.updateTbResto)
  app.put('/api/updateTbRestoMenu',AdminResto.updateTbRestoMenu)
  app.put('/api/updateTbRestoGallery',AdminResto.updateTbRestoGallery)
  app.put('/api/updateTbRestoGalleryNormal',AdminResto.updateTbRestoGalleryNormal)
  app.put('/api/deleteTbRestoGallery',AdminResto.deleteTbRestoGallery)
  app.put('/api/deleteTbRestoMenu/:id',AdminResto.deleteTbRestoMenu)
  
  //System Admin
  app.get('/api/getReqAdminResto',SystemAdmin.getTbRequestAdminInProgress)
  app.get('/api/getTbUserAll',SystemAdmin.getTbUserAll)
  app.put('/api/updateTbUser',SystemAdmin.updateTbUser)
  app.put('/api/ApproveReqAdmin',SystemAdmin.ApproveReqAdmin)
  app.put('/api/RejectReqAdmin',SystemAdmin.RejectReqAdmin)

  //Utility
  app.post('/api/upload/:direct/:id',Uploaders.uploadImg)
  app.post('/api/upload/:direct',Uploaders.uploadMultiImgResto)
}