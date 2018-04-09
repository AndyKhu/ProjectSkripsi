const fs = require('fs')
const path = require('path')
module.exports = {
    getrestoI (res, db, userid){
        db.query('SELECT * FROM tdresto_info WHERE parentid=$1', [userid], (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				const first = result.rows[0]
				res.json({data: {
				  rn: first.name,
				  pn: first.phone_number,
				  rd: first.description,
				  opn: first.other_phone,
				  prf: first.price_from,
				  pre: first.price_end,
				  web: first.web,
				  dof: first.dayoperation_from,
				  doe: first.dayoperation_end,
				  tof: first.timeoperation_from,
				  toe: first.timeoperation_end,
				  ds: first.style,
				  add: first.address,
				  rt: first.type.split(','),
				  tf: first.tablef.split(',')
				}, good:"Save Success"})
			}else{
				res.json({data:{
					rn: '',
					pn: '',
					rd: '',
					opn: '',
					prf: '',
					pre: '',
					web: '',
					dof: '',
					doe: '',
					tof: '',
					toe: '',
					ds: '',
					add: '',
					rt: [],
					tf: []
				}})
			}
		})
	},
	getrestoF (res, db, userid){
        db.query('SELECT * FROM tdresto_facility WHERE parentid=$1', [userid], (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				res.json({data: result.rows})
			}else{
				res.json({data:[]})
			}
		})
	},
	getrestoD (res, db, userid){
        db.query('SELECT * FROM tdresto_duration WHERE parentid=$1', [userid], (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				res.json({data: result.rows})
			}else{
				res.json({data:[]})
			}
		})
	},
	getrestoM (res, db, userid){
        db.query('SELECT * FROM tdresto_menu WHERE parentid=$1', [userid], (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				res.json({data: result.rows})
			}else{
				res.json({data:[]})
			}
		})
	},
	getrestoMWP (res, db, userid){
        db.query('SELECT * FROM tdresto_menu WHERE parentid=$1', [userid], (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				let a =[]
				for (var key in result.rows) {
					var obj = result.rows[key]
					res.set({'Content-Type': obj.pictype})
					var bitmap = fs.readFileSync(path.join(`uploads/${userid}/2/`, obj.picid))
					a.push({pic:bitmap,data: obj})
				}
				res.json({data: a})
			}else{
				res.json({data:[]})
			}
		})
	},
	getlistresto (res, db){
		db.query('SELECT * FROM viewresto', (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				let a =[]
				for (var key in result.rows) {
					var obj = result.rows[key]
					res.set({'Content-Type': obj.filetype})
					var bitmap = fs.readFileSync(path.join(`uploads/${obj.parentid}/0/`, obj.fileid))
					a.push({pic:bitmap,data: obj})
				}
				res.json({data: a})
			}else{
				res.json({data:[]})
			}
		})
	},
	getrestodetail (res, db, id){
		db.query(`SELECT * FROM viewresto where id = '${id}' `, (err, result) => {
			if(err) {
				res.status(400).send({error : 'Save Failed'});
			}
			if(result.rows.length > 0) {
				// let a =[]
				// for (var key in result.rows) {
				// 	var obj = result.rows[key]
				// 	res.set({'Content-Type': obj.filetype})
				// 	var bitmap = fs.readFileSync(path.join(`uploads/${obj.parentid}/0/`, obj.fileid))
				// 	a.push({pic:bitmap,data: obj})
				// }
				res.json({data: result.rows[0]})
			}else{
				res.json({data:[]})
			}
		})
	}
}