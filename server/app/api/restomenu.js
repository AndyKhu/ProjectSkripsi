const del = require('del')
function guid(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = {
    restosave (res,db,userid,menu) {
        db.query(
            "insert into tdresto_menu values ($1,$2,$3,$4,$5,$6,$7)",
            [
                guid(),
                userid,
                menu.name,
                menu.price,
                menu.md,
                menu.mp,
                menu.mpt
            ], (err, result) => {
                if(err){
                    res.json({error: "Save Failed"})
                }else{
                    res.json({good: "Save Success"})
                }
        })
    },
    restodel (res,db,userid){
        db.query(
            "delete from tdresto_menu where parentid=$1",
            [
                userid
            ], (err, result) => {
                if(err){
                    res.status(400).send({error : 'Save Failed'});
                }else{
                    res.json({good: "Delete Success"})
                }
            }
        )
    },
    restodelMP (res,db,userid,data){
        let str = []
        str.push(`uploads/${userid}/2/**`)
        str.push(`!uploads/${userid}/2`)
        for (key in data) {
            str.push(`!uploads/${userid}/2/${data[key]}`)
        }
        del.sync(str)
        res.json({good:'good'})
    }
}