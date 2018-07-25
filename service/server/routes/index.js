const Auth = require('../controllers').Auth
const SystemAdmin = require('../controllers').SystemAdmin
const AdminResto = require('../controllers').AdminResto
const Uploaders = require('../controllers').Uploaders
const Member = require('../controllers').Member
// const Algo = require('../../algorithm.js')
const Algo = require('../controllers').Algo

module.exports = (app) => {
  //AUTH
  app.get('/checkAuth',Auth.requireAuth,Auth.checkAuth)
  app.post('/api/signup',Auth.Signup,Auth.signupcb)
  app.post('/api/login',Auth.Login,Auth.signincb)
  app.post('/api/createReqAdmin',Auth.createReqAdmin)
  app.post('/api/changePass',Auth.changePass)
  
  // member
  // app.get('/api/getListRestourant',Member.getListRestourant)
  app.post('/api/getListRestourant',Member.getListRestourant)
  app.get('/api/getListRestourantTrending',Member.getListRestaurantTrending)
  app.get('/api/getRestoDetail/:id',Member.getRestoDetail)
  app.get('/api/maxValueResto',Member.getMaxValue)
  app.get('/api/getHistoryReserverById/:id',Member.getHistoryReserverById)
  app.get('/api/getReservationHistory/:id',Member.getReservationHistory)
  app.get('/api/getReservationHistory2/:id',Member.getReservationHistory2)
  app.get('/api/getRestoDetailmin/:id',Member.getRestoDetailmin)
  app.get('/api/getUserFavorite/:id',Member.getUserFavorite)
  app.post('/api/saveRestoReview',Member.saveRestoReview)
  app.post('/api/saveRestoReserve',Member.saveRestoReserve)
  app.post('/api/updateProfile',Member.updateProfile)
  app.post('/api/updateFavorite',Member.updateFavorite)
  app.post('/api/getCountReservasi',Member.getCountReservasi)
  app.post('/api/closeAccount/:id',Member.closeAccount)
  app.post('/api/getListBank/:id',Member.getListBank)
  app.put('/api/cancelReservation/:id',Member.cancelReservation)
  app.put('/api/updateNotif/:id',Member.updateNotif)
  app.post('/api/HistoryReservationUpload',Member.HistoryReservationUpload)
  app.post('/api/fortesting',Algo.execute)

  //Admin Resto
  app.get('/api/getTbRestoByuserID/:id',AdminResto.getTbRestoByuserID)
  app.get('/api/getTbReservationConfirm/:id',AdminResto.getTbReservationConfirm)
  app.post('/api/getTbReservationSchedule',AdminResto.getTbReservationSchedule)
  app.post('/api/getTbReservationSchedule2',AdminResto.getTbReservationSchedule2)
  app.get('/api/getTbRestoByuserIDmin/:id',AdminResto.getTbRestoByuserIDmin)
  app.put('/api/updateTbResto',AdminResto.updateTbResto)
  app.put('/api/updateTbRestoMenu',AdminResto.updateTbRestoMenu)
  app.put('/api/updateTbRestoGallery',AdminResto.updateTbRestoGallery)
  app.put('/api/updateTbRestoGalleryNormal',AdminResto.updateTbRestoGalleryNormal)
  app.put('/api/deleteTbRestoGallery',AdminResto.deleteTbRestoGallery)
  app.put('/api/deleteTbRestoMenu/:id/:pid/:restoid',AdminResto.deleteTbRestoMenu)
  app.put('/api/updateRestoReview/:id',AdminResto.updateRestoReview)
  app.put('/api/saveRestoRate/:id/:rate',AdminResto.saveRestoRate)
  app.put('/api/updateTbReservationConfirm/:id/:status',AdminResto.updateTbReservationConfirm)
  app.put('/api/updateTbReservationSchedule/:reserveId/:scheduleId',AdminResto.updateTbReservationSchedule)
  
  
  //System Admin
  app.get('/api/getReqAdminResto',SystemAdmin.getTbRequestAdminInProgress)
  app.get('/api/getTbReview',SystemAdmin.getTbReview)  
  app.get('/api/getTbReviewAll',SystemAdmin.getTbReviewAll)  
  app.get('/api/getTbUserAll',SystemAdmin.getTbUserAll)
  app.put('/api/updateTbUser',SystemAdmin.updateTbUser)
  app.put('/api/ApproveReqAdmin',SystemAdmin.ApproveReqAdmin)
  app.put('/api/RejectReqAdmin',SystemAdmin.RejectReqAdmin)
  app.put('/api/updateRestoReviewSA/:id/:status',SystemAdmin.updateRestoReview)
  app.post('/api/getListRestoObject',SystemAdmin.getListRestoObject)

  //Utility
  app.get('/api/getSingleImg/:direct/:id',Uploaders.getSingleImg)
  app.post('/api/upload/:direct/:id',Uploaders.uploadImg)
  app.post('/api/uploadSingle/:direct',Uploaders.uploadImg)
  app.post('/api/upload/:direct',Uploaders.uploadMultiImgResto)
}