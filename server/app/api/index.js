const resto = require('./restoinfo')
const restof = require('./restofacility')
const restod = require('./restoduration')
const getapi = require('./getapi')
const restom = require('./restomenu')
function guid(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = {
	//Save Function
    restoinfo: (db) => (req, res, next) => {
		const userid = req.body.userid
		const info = req.body.data
		const ids = guid()
		const x = info.prf === '' ? 0 : info.prf
		const xd = info.pre === '' ? 0 : info.pre
		resto.restoinfo(res,db,userid,info,x,xd,ids)
	},
	restofac: (db) => (req, res, next) => {
		const userid = req.body.userid
		const fac = req.body.data
		restof.restosave(res,db,userid,fac)
	},
	restodur: (db) => (req, res, next) => {
		const userid = req.body.userid
		const dur = req.body.data
		restod.restosave(res,db,userid,dur)
	},
	restomenu: (db) => (req, res, next) => {
		const userid = req.body.userid
		const menu = req.body.data
		restom.restosave(res,db,userid,menu)
	},
	//Delete Function
	delrestoF: (db) => (req, res, next) => {
		const userid = req.params.id
		restof.restodel(res,db,userid)
	},
	delrestoD: (db) => (req, res, next) => {
		const userid = req.params.id
		restod.restodel(res,db,userid)
	},
	delmenu: (db) => (req, res, next) => {
		const userid = req.params.id
		restom.restodel(res,db,userid)
	},
	delrestoMP: (db) => (req, res, next) => {
		const data = req.body.data		
		const userid = req.params.id
		restom.restodelMP(res,db,userid,data)
	},

	//Get Function
	getrestoI: (db) => (req, res, next) => {
		const userid = req.params.id
		getapi.getrestoI(res,db,userid)
	},
	getrestoF: (db) => (req, res, next) => {
		const userid = req.params.id
		getapi.getrestoF(res,db,userid)
	},
	getrestoD: (db) => (req, res, next) => {
		const userid = req.params.id
		getapi.getrestoD(res,db,userid)
	},
	getrestoM: (db) => (req, res, next) => {
		const userid = req.params.id
		getapi.getrestoM(res,db,userid)
	},
	getrestoMWP: (db) => (req, res, next) => {
		const userid = req.params.id
		getapi.getrestoMWP(res,db,userid)
	},
	getlistresto: (db) => (req, res, next) => {
		getapi.getlistresto(res,db)
	},
	getrestodetail: (db) => (req, res, next) => {
		getapi.getrestodetail(res,db,req.params.id)
	}
}