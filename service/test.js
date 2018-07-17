const Models = require('./server/models')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/server/config/config.json`)[env]
const moment = require('moment')
const _ = require('lodash')
const data = require('./data.js')

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  )
}
module.exports = {
  async execute(req, res, next) {
    const coRate = 0.7 //crossover rate
    
    let kromosom = data.data
    // console.log(kromosom[0].length)
    // pasangkan kromsom (ex: [k1,k2,k3,k4,k5,k6] -> [k1,k2], [k3,k4], [k5,k6])
    let kromosominduk = getkromosominduk(kromosom)
    kromosominduk.map(item => {
      //random nilai dari 0 sampai 1 (ex: 0.55,0.13,0.24)
      let tmpx = Math.round(((Math.random() * 1) + 0) * 100) / 100 
      if(tmpx < coRate){
        // random nilai dari 2 sampai panjang reservasi - 1 (ex: total reservasi = 20 maka di random nilai dari 2 sampai 19)
        let coRandomSplit = Math.floor((Math.random() * (item[0].length-2))) + 2 

      }
      console.log("a : "+ item[0].length)
      console.log("b : "+ item[1].length)
    })
  }
}

//function helper
function dateCheckComplete(from, to, check , check2) {
  var fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);
  cDatex = Date.parse(check2);
  if ((cDate < lDate && cDate > fDate) || (cDatex < lDate && cDatex > fDate) || ((fDate === cDate) && (lDate === cDatex))) {
    return true;
  }
  return false;
}

function ReservasiBentrok(x){
  let xtmp = []
  x.map((a) =>{
    x.map((b)=>{
      if(a.reserveId != b.reserveId){
        if(dateCheck(b.timeS,b.timeE,a.timeS,a.timeE)){
          if(a.seatId = b.seatId){
            xtmp.push([a.reserveId, b.reserveId].sort().toString())
          }
        }
      }
    })
  })
  let unique_array = Array.from(new Set(xtmp))
  return unique_array
}

function getkromosominduk(x) {
  let xtmp = []
  for(let i = 0 ; i < x.length ; i+=2){
    xtmp.push([x[i],x[i+1]])
  }
  return xtmp
}