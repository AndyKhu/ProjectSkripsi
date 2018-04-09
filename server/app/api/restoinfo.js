module.exports = {
restoinfo (res,db,userid,info,x,xd,ids) {
    db.query('SELECT id FROM tdresto_info WHERE parentid=$1', [userid], (err, result) => {
        if(err) {
            res.status(400).send({error : 'Save Failed'});
        }

        if(result.rows.length > 0) {
            db.query(
                "update tdresto_info SET name=$2, phone_number=$3, description=$4, "+
                "other_phone=$5, price_from=$6, price_end=$7, web=$8, dayoperation_from=$9,"+
                "dayoperation_end=$10, timeoperation_from=$11, timeoperation_end=$12, style=$13,"+
                "address=$14, type=$15, tablef=$16 where parentid = $1",
                [
                    userid,
                    info.rn,
                    info.pn,
                    info.rd,
                    info.opn,
                    x,
                    xd,
                    info.web,
                    info.dof,
                    info.doe,
                    info.tof,
                    info.toe,
                    info.ds,
                    info.add,
                    info.rt+"",
                    info.tf+""
                ], (err, result) => {
                    if(err){
                        res.status(400).send({error : 'Save Failed'});
                    }else{
                        res.json({nice:"Save Success"})
                    }
                }
            )
        } else {
            db.query(
                "insert into tdresto_info values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)",
                [
                    ids,
                    userid,
                    info.rn,
                    info.pn,
                    info.rd,
                    info.opn,
                    x,
                    xd,
                    info.web,
                    info.dof,
                    info.doe,
                    info.tof,
                    info.toe,
                    info.ds,
                    info.add,
                    info.rt+"",
                    info.tf+""
                ], (err, result) => {
                    if(err){
                        res.json({error: "Save Failed"})
                    }else{
                        res.json({add: "Save Success"})
                    }
                })
        }
        })
}
}