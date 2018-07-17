const Models = require('./server/models')
const Sequelize = require('sequelize')
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/server/config/config.json`)[env]
const moment = require('moment')
const _ = require('lodash')

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
    let n = 6 //Kromosom
    let a = 1 //fitness
    let coRate = 0.7 //crossover rate
    let coRandomSplit //random nilai split
    let coRandomRate = []
    let listResto = await getListResto() //listResto
    let mutasionRate = 0.1
    listResto.forEach(async (val, index) => {
      let Resto = val
      let listReservation = await getListReservation(Resto.Id)
      let SeatsTotal = await getTotalSeat(Resto.Id)
      let krimsonR = await getKrimsonR(listReservation, SeatsTotal, n, Resto) //penampung populasi awal
      let krimsonM = []
      krimsonR.forEach(async (krims, index) => {
        let fault = 0
        let xtmp = []
        krims.sort(compare)
        krims.forEach((prev, pindex) => {
          krims.forEach((next, nindex) => {
            if (prev.reserveId !== next.reserveId) {
              if (dateCheck(next.timeS, next.timeE, prev.timeS) || dateCheck(next.timeS, next.timeE, prev.timeE) || dateCheckSD(next.timeS, next.timeE, prev.timeS, prev.timeE)) {
                if (prev.seatId === next.seatId) {
                  xtmp.push([prev.reserveId, next.reserveId].sort().toString())
                }
              }
            }
          })
        })
        let unique_array = Array.from(new Set(xtmp))
        krims.fitness = 1 / (unique_array.length + a)
      })
      let krimsonA = _.cloneDeep(krimsonR);
      for (let ix = 0; ix < krimsonR.length; ix += 2) {
        let tmpx = Math.round(((Math.random() * 1) + 0) * 100) / 100
        console.log("tmpx1 : " + tmpx)
        coRandomRate.push(tmpx)
        if (tmpx < coRate) {
          coRandomSplit = Math.floor((Math.random() * krimsonR.length) + 2);
          console.log("coRandomSplit : " + coRandomSplit)
          let krimA = krimsonR[ix].slice(coRandomSplit - 1, krimsonR[ix].length)
          krimsonR[ix].splice(coRandomSplit - 1, krimsonR[ix].length - coRandomSplit + 1)
          let krimB = krimsonR[ix + 1].slice(coRandomSplit - 1, krimsonR[ix + 1].length)
          krimsonR[ix + 1].splice(coRandomSplit - 1, krimsonR[ix + 1].length - coRandomSplit + 1)
          krimsonR[ix] = krimsonR[ix].concat(krimB)
          krimsonR[ix + 1] = krimsonR[ix + 1].concat(krimA)
          krimsonM = krimsonM.concat(krimsonR[ix]).concat(krimsonR[ix + 1])
        }
      }
      let krimsonB = _.cloneDeep(krimsonR);
      let krimsonC = _.cloneDeep(krimsonM);
      let totalgen = listReservation.length * krimsonR.length
      let totalgenMutasi = mutasionRate * totalgen
      for (let i = 0; i < totalgenMutasi; i++) {
        let tmpx = Math.round(((Math.random() * 1) + 0) * 100) / 100
        console.log("tmpx2 : " + tmpx)
        if (tmpx < mutasionRate) {
          if (krimsonM.length !== 0) {
            let tmpM = Math.floor((Math.random() * krimsonM.length - 1) + 0);
            console.log("tmpM : " + tmpM)
            let st = SeatsTotal.filter((e) => { return e.seatFrom <= krimsonM[tmpM].totalSeats && e.seatEnd >= krimsonM[tmpM].totalSeats })
            let tmp = Resto.Seats.filter((e) => { return e.seatFrom <= krimsonM[tmpM].totalSeats && e.seatEnd >= krimsonM[tmpM].totalSeats })
            // console.log(tmp.length)
            let x = Math.floor((Math.random() * st[0].count) + 0);
            console.log("x : " + x)
            krimsonM[tmpM].seatId = tmp[x].Id
          }
        }
      }
      let krimsonD = _.cloneDeep(krimsonM);
      let krimsonG = []
      for (let i = 0; i < krimsonM.length / listReservation.length; i++) {
        krimsonG.push(krimsonM.slice(i * listReservation.length, (i + 1) * listReservation.length))
      }
      let krimsonE = _.cloneDeep(krimsonG)
      krimsonG.forEach(async (krims, index) => {
        let xtmp = []
        krims.sort(compare)
        krims.forEach((prev, pindex) => {
          krims.forEach((next, nindex) => {
            if (prev.reserveId !== next.reserveId) {
              if (dateCheck(next.timeS, next.timeE, prev.timeS) || dateCheck(next.timeS, next.timeE, prev.timeE) || dateCheckSD(next.timeS, next.timeE, prev.timeS, prev.timeE)) {
                if (prev.seatId === next.seatId) {
                  xtmp.push([prev.reserveId, next.reserveId].sort().toString())
                }
              }
            }
          })
        })
        let unique_array = Array.from(new Set(xtmp))
        // console.log(unique_array.length)
        unique_array.forEach((IdkrimsBentrok, index) => {
          let splitBentrok = IdkrimsBentrok.split(',')[0]
          let krimsBentrok = krims.filter((e) => { return e.reserveId === splitBentrok })[0]
          Resto.Seats.filter((e) => { return e.seatFrom <= krimsBentrok.totalSeats && e.seatEnd >= krimsBentrok.totalSeats }).forEach((seat, index) => {
            if (krims.filter((e) => { return e.seatId === seat.Id && (dateCheck(e.timeS, e.timeE, krimsBentrok.timeS) || dateCheck(e.timeS, e.timeE, krimsBentrok.timeE) || dateCheckSD(e.timeS, e.timeE, krimsBentrok.timeS, krimsBentrok.timeE)) }).length === 0) {
              krims.filter((e) => { return e.reserveId === splitBentrok })[0].seatId = seat.Id
            } else {
              let splitBentrok2 = IdkrimsBentrok.split(',')[1]
              let krimsBentrok2 = krims.filter((e) => { return e.reserveId === splitBentrok2 })[0]
              Resto.Seats.filter((e) => { return e.seatFrom <= krimsBentrok.totalSeats && e.seatEnd >= krimsBentrok.totalSeats }).forEach((seat, index) => {
                if (krims.filter((e) => { return e.seatId === seat.Id && (dateCheck(e.timeS, e.timeE, krimsBentrok.timeS) || dateCheck(e.timeS, e.timeE, krimsBentrok.timeE) || dateCheckSD(e.timeS, e.timeE, krimsBentrok.timeS, krimsBentrok.timeE)) }).length === 0) {
                  krims.filter((e) => { return e.reserveId === splitBentrok2 })[0].seatId = seat.Id
                }
               })
            }
          })
        })
      })
      // krimsonG.forEach(async (krims, index) => {
      //   let xtmp = []
      //   krims.sort(compare)
      //   krims.forEach((prev, pindex) => {
      //     krims.forEach((next, nindex) => {
      //       if (prev.reserveId !== next.reserveId) {
      //         if (dateCheck(next.timeS, next.timeE, prev.timeS) || dateCheck(next.timeS, next.timeE, prev.timeE) || dateCheckSD(next.timeS, next.timeE, prev.timeS, prev.timeE)) {
      //           if (prev.seatId === next.seatId) {
      //             xtmp.push([prev.reserveId, next.reserveId].sort().toString())
      //           }
      //         }
      //       }
      //     })
      //   })
      //   let unique_array = Array.from(new Set(xtmp))
      //   // console.log("a :" + unique_array)
      //   unique_array.forEach((IdkrimsBentrok, index) => {
      //     let splitBentrok = IdkrimsBentrok.split(',')
      //     let krimsBentrok1 = krims.filter((e) => { return e.reserveId === splitBentrok[0]})[0]
      //     let krimsBentrok2 = krims.filter((e) => { return e.reserveId === splitBentrok[1]})[0]
      //     Resto.Seats.filter((e) => { return e.seatFrom <= krimsBentrok1.totalSeats && e.seatEnd >= krimsBentrok1.totalSeats}).forEach((seat,index)=>{
      //       // if(seat.Id !== krimsBentrok1.seatId){
      //         krims.filter((e)=> { return e.seatId === seat.Id && (dateCheck(e.timeS, e.timeE, krimsBentrok.timeS) || dateCheck(e.timeS, e.timeE, krimsBentrok.timeE) || dateCheckSD(e.timeS, e.timeE, krimsBentrok.timeS, krimsBentrok.timeE)) }).forEach((v,index)=>{
      //           if(v.reserveId != krimsBentrok1.reserveId ){
      //             let tmpbseatId = krimsBentrok1.seatId
      //             let tmpSeatId = v.seatId
      //             v.seatId = '-'
      //             krimsBentrok1.seatId = '-'
      //             if (krims.filter((e) => { return e.seatId === seat.Id && (dateCheck(e.timeS, e.timeE, krimsBentrok1.timeS) || dateCheck(e.timeS, e.timeE, krimsBentrok1.timeE) || dateCheckSD(e.timeS, e.timeE, krimsBentrok1.timeS, krimsBentrok1.timeE)) }).length === 0) {
      //               // krims.filter((e) => { return e.reserveId === krimsBentrok1.reserveId })[0].seatId = seat.Id
      //             } 
      //           }
      //         })
      //       // }
      //       // if(krims.filter((e)=> { return e.seatId === seat.Id && dateKecil(krimsBentrok2.timeS,e.timeE)}).length > 0){
      //       //   let tmpseatA = krims.filter((e)=> { return e.seatId === seat.Id && dateKecil(krimsBentrok2.timeS,e.timeE)})[0].seatId
      //       //   let tmpseatB = krimsBentrok1.seatId
      //       //   krimsBentrok1.seatId = tmpseatA
      //       //   krims.filter((e)=> { return e.seatId === seat.Id && dateKecil(krimsBentrok2.timeS,e.timeE)})[0].seatId = tmpseatB
      //       // }
      //     })
      //   })
      // })
      // krimsonG.forEach(async (krims,index) => {
      //   let xtmp = []
      //   krims.sort(compare)
      //   krims.forEach((prev,pindex)=>{
      //     krims.forEach((next,nindex) =>{
      //       if(prev.reserveId !== next.reserveId){
      //         if(dateCheck(next.timeS,next.timeE,prev.timeS)|| dateCheck(next.timeS,next.timeE,prev.timeE ) || dateCheckSD(next.timeS,next.timeE,prev.timeS,prev.timeE)){
      //           if(prev.seatId === next.seatId){
      //             xtmp.push([prev.reserveId,next.reserveId].sort().toString())
      //           }
      //         }
      //       }
      //     })
      //   })
      //   let unique_array = Array.from(new Set(xtmp))
      //   console.log(unique_array)
      // })
      // console.log(krimsonM.length)
      // console.log(krimsonG.length)
      let data = { a: krimsonA, b: krimsonB, c: krimsonC, d: krimsonD, e: krimsonE, g: krimsonG }
      res.status(200).send(data)
      // let krimsonG = krimsonM
      // console.log(krimsonR)
      // console.log(listReservation)
    })
  }
}
async function getListResto() {
  let listResto
  await Models.Tb_Resto.findAll({
    where: { Status: true },
    include: [
      {
        model: Models.Tb_Resto_Seat,
        as: 'Seats'
      }]
  }).then(listRestos => {
    listResto = listRestos
  }).catch(err => {
    console.log(err)
    listResto = []
  })
  return listResto
}
async function getListReservation(Id) {
  let reservationList
  await Models.Tb_User_Reservation.findAll({
    where: { Status: 0, RestoId: Id }
  }).then(list => {
    reservationList = list
  }).catch(err => {
    console.log(err)
    reservationList = []
  })
  return reservationList
}
async function getTotalSeat(Id) {
  let seatCount
  await sequelize.query(`select count("seatFrom"),"seatFrom","seatEnd" from public."Tb_Resto_Seats" where "Id_Resto" = '${Id}' group by "seatFrom","seatEnd"`, { type: Sequelize.QueryTypes.SELECT })
    .then(seatC => {
      seatCount = seatC
    }).catch(err => {
      console.log(err)
      seatCount = []
    })
  return seatCount
}
async function getKrimsonR(listReservation, SeatsTotal, n, Resto) {
  let krimsonR = []
  for (let i = 0; i < n; i++) {
    let krimsontmp = []
    listReservation.forEach(async (val, index) => {
      let st = SeatsTotal.filter((e) => { return e.seatFrom <= val.totalSeats && e.seatEnd >= val.totalSeats })
      let tmp = Resto.Seats.filter((e) => { return e.seatFrom <= val.totalSeats && e.seatEnd >= val.totalSeats })
      // console.log(tmp.length)
      let x = Math.floor((Math.random() * st[0].count) + 0);
      let constTimeE = new Date(val.reserveDate.getTime() + val.Duration * 60000)
      krimsontmp.push({ reserveId: val.Id, seatId: tmp[x].Id, totalSeats: val.totalSeats, timeS: val.reserveDate, timeE: constTimeE, restoO: Resto.OpenTime, restoC: Resto.CloseTime })
    })
    krimsonR.push(krimsontmp)
  }
  return krimsonR
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.reserveId
  const genreB = b.reserveId

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}
function dateCheck(from, to, check) {
  var fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);
  if ((cDate < lDate && cDate > fDate)) {
    return true;
  }
  return false;
}
function dateCheckSD(from, to, checkF, checkT) {
  var fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDateF = Date.parse(checkF);
  cDateT = Date.parse(checkT);
  if ((fDate === cDateF) && (lDate === cDateT)) {
    return true;
  }
  return false;
}
function dateKecil(from, to) {
  var fDate, lDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  if (fDate <= lDate) {
    return true;
  }
  return false;
}
//new Function
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