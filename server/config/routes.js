const winston = require('winston')
const { requiresLogin, requiresAdmin } = require('./middlewares/authorization')
const users = require('../app/users')
const api = require('../app/api')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const del = require('del')
const UPLOAD_PATH = 'uploads'
var storage = multer.diskStorage({
	destination: function (req, file, cb) {
	  if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}`)){
		fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}`)
	  }
	  if (!fs.existsSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)){
		fs.mkdirSync(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}`)
	  }
	  cb(null, `${UPLOAD_PATH}/${req.params.id}/${req.params.type}/`)
	},
	filename: function (req, file, cb) {
	  cb(null, file.fieldname + '-' + guid(false))
	}
  })
var upload = multer({ storage: storage })
function guid(bol){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	if(bol)
		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	else
		return s4()+s4()
}

module.exports = (app, passport, db) => {
	app.post('/api/login', passport.authenticate('local-login'), users.login)
	app.get('/api/logout', users.logout)
	app.post('/api/signup', users.signup(db))

	app.post('/api/saverestoI', api.restoinfo(db))
	app.post('/api/saverestoF', api.restofac(db))
	app.post('/api/saverestoD', api.restodur(db))
	app.post('/api/saverestoM/', api.restomenu(db))
	app.post('/api/delrestoF/:id', api.delrestoF(db))
	app.post('/api/delrestoD/:id', api.delrestoD(db))
	app.post('/api/delmenu/:id', api.delmenu(db))
	app.post('/api/delrestoPM/:id', api.delrestoMP(db))
	app.get('/api/getrestoI/:id', api.getrestoI(db))
	app.get('/api/getrestoF/:id', api.getrestoF(db))
	app.get('/api/getrestoD/:id', api.getrestoD(db))
	app.get('/api/getrestoM/:id', api.getrestoM(db))
	app.get('/api/getrestoMWP/:id', api.getrestoMWP(db))
	app.get('/api/getlistresto', api.getlistresto(db))
	app.get('/api/getrestodetail/:id', api.getrestodetail(db))

	app.post('/api/upload/:id/:type', upload.array('img', 6), async (req, res) => {
		try{
			var status = false
			for (var key in req.files) {
				var obj = req.files[key]
				db.query(
					"insert into tdresto_gallery values ($1,$2,$3,$4,$5,$6)",
					[
						guid(true),
						req.params.id,
						req.params.type,
						obj.filename,
						obj.originalname,
						obj.mimetype
					], (err, result) => {
						if(err){
							status =false
						}else{
							status =true
						}
				})
			}
			if(status){
				res.json({good: "Save Success"})
			}else{
				res.json({error: "Save Failed"})
			}
		}catch(err){
			res.status(400).send({error:'Failed'})
		}
	})
	app.post('/api/uploads/:id/:type', upload.single('img'), async (req, res) => {
		try{
				var obj = req.file
				db.query(
					"insert into tdresto_gallery values ($1,$2,$3,$4,$5,$6)",
					[
						guid(true),
						req.params.id,
						req.params.type,
						obj.filename,
						obj.originalname,
						obj.mimetype
					], (err, result) => {
						if(err){
							res.status(400).send({error:'Failed'})
						}else{
							res.json({fileid: obj.filename, filetype: obj.mimetype, good: "Save Success"})				
						}
				})
		}catch(err){
			res.status(400).send({error:'Failed'})
		}
	})
	app.post('/api/delupload/:id/:type',(req,res) => {
		del.sync([`${UPLOAD_PATH}/${req.params.id}/${req.params.type}/**`, `!${UPLOAD_PATH}/${req.params.id}/${req.params.type}`]);
		db.query(
            "delete from tdresto_gallery where parentid=$1 and type = $2",
            [
				req.params.id,
				req.params.type
            ], (err, result) => {
                if(err){
                    res.status(400).send({error : 'Save Failed'});
                }else{
                    res.json({good: "Delete Success"})
                }
            }
        )
	})
	app.get('/api/getupload/:id/:type',(req,res) => {
		db.query(`SELECT * FROM tdresto_gallery WHERE parentid= $1 and type = $2`, [req.params.id, req.params.type], (err, result) => {
			let a = [];
			if(err) {
				res.status(400).send({error : 'get Failed'});
			}
			if(result.rows.length > 0) {
				for (var key in result.rows) {
					var obj = result.rows[key]
					res.set({'Content-Type': obj.filetype})
					// res.sendFile(path.join(__dirname + `/../${UPLOAD_PATH}/${req.params.id}/`, obj.fileid+".png"));
					var bitmap = fs.readFileSync(path.join(`${UPLOAD_PATH}/${req.params.id}/${req.params.type}/`, obj.fileid))
					a.push({data:bitmap,type:obj.filetype,id: obj.fileid,name: obj.filename})
				}
				res.json(a)
			}else{
				res.json({data:[]})
			}
		})
	})


	app.use(function (err, req, res, next) {
		if (err.message && (~err.message.indexOf('not found'))) {
			return next()
		}

		winston.error(err.stack)

		return res.status(500).json({error: 'Error on backend occurred.'})
	})

	app.use(function (req, res) {
		const payload = {
			url: req.originalUrl,
			error: 'Not found'
		}
		if (req.accepts('json')) return res.status(404).json(payload)

		res.status(404).render('404', payload)
	})
}

