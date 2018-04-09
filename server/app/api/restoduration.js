function guid(){
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}
module.exports = {
    restosave (res,db,userid,dr) {
        db.query(
            "insert into tdresto_duration values ($1,$2,$3)",
            [
                guid(),
                userid,
                dr.min
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
            "delete from tdresto_duration where parentid=$1",
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
    }
}