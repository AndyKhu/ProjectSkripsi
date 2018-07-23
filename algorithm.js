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
    let stoplist = req.body
    let listres = []
    let listResto = await getListResto() //listResto
    let iterasi = 200 // jumlah iterasi
    // untuk testing
    let kromosomA,kromosomB,kromosomC,kromosomD,kromosomE,kromosomF,kromosomG,kromosomH,kromosomI
    listResto.forEach(async (val, index) => {
      for(let it = 0 ;it<iterasi;it++){
        let n = 6 // Jumlah Kromosom
        let Resto = val
        let SeatsTotal = await getTotalSeat(Resto.Id)
        let listReservation = await getListReservation(Resto.Id)
        let kromosom = await getKrimsonR(listReservation, SeatsTotal, n, Resto)
        // let kromosom = _.cloneDeep(data.data)
        kromosomA = _.cloneDeep(kromosom)
        let totalgen = kromosomA[0].length      
        // pasangkan kromsom (ex: [k1,k2,k3,k4,k5,k6] -> [k1,k2], [k3,k4], [k5,k6])
        let kromosominduk = getkromosominduk(kromosom)
        kromosomB = _.cloneDeep(kromosominduk)
        //fungsi Algoritma Genetika CrossOver
        crossover(kromosominduk)
        kromosomC = saveCOkromosom(kromosominduk)
        let kromosomMutasi = getkromosomMutasi(_.cloneDeep(kromosominduk))
        // let kromosomMutasi = getkromosomMutasi(_.cloneDeep(kromosominduk.length === 0 ? kromosomB:kromosominduk))
        kromosomD = _.cloneDeep(kromosomMutasi)
        //fungsi Algoritma Genetika Mutasi
        mutasi(kromosomMutasi,SeatsTotal,Resto)
        kromosomE = _.cloneDeep(kromosomMutasi)
        let kromosomVND1 = getkromosomVND1(kromosomMutasi,totalgen)
        kromosomF = _.cloneDeep(kromosomVND1)
        //fungsi Algoritma VND Moving One Operation
        movingOneOperation(kromosomVND1,Resto)
        kromosomG = _.cloneDeep(kromosomVND1)
        // tempat penyimpanan gen yang dapat dipindah pada MovingTwoOperation
        let tmp = []
        //fungsi Algoritma VND Moving Two Operation
        MovingTwoOperation(kromosomVND1,Resto,tmp)
        kromosomH = _.cloneDeep(kromosomVND1)
        /*
          - kromosomA = Kromosom Awal
          - kromosomC = kromosom CrossOver
          - kromosomF = kromosom Mutasi
          - kromosomG = Kromosom Moving One Operation
          - kromosomH = kromosom Moving Two Operation
        */
        let xtmp = getBestFitness(kromosomA,kromosomC,kromosomF,kromosomG,kromosomH)
        let kromosomSelection = []
        let xtmp2 = []
        if(xtmp.length > 2){
          let tmpkromosomSelection = []
          kromosomSelection.push(xtmp[0])
          kromosomSelection.push(xtmp[1])
          xtmp.splice(0,2)
          for(let i = 0 ;i<n-2;i++){
            let random = Math.floor((Math.random() * xtmp.length))
            tmpkromosomSelection.push(xtmp[random])
          }
          let totalfitness = tmpkromosomSelection.map(item => item.fitness).reduce((prev, next) => prev + next);
          var xfitnes = 0
          tmpkromosomSelection.forEach((val,index)=>{
            val.prob =  Math.round((val.fitness/totalfitness)*100)/100
            val.minprob =  Math.round((xfitnes)*100)/100
            val.maxprob =  Math.round(( xfitnes + val.prob )*100)/100
            xfitnes += val.prob + 0.01
            // x = await Math.round((x + (Math.round((val.fitness/totalfitness)*100)/100) + 0.01)*100)/100
          })
          xtmp2 = _.cloneDeep(tmpkromosomSelection)
          // for(let i = 0;i<4;i++){
            // console.log(kromosomSelection.length)
          while(true){
            if(kromosomSelection.length >= n){
              break
            }
            let random = Math.round(((Math.random() * 1) + 0) * 100) / 100
            // console.log('a : '+random)
            let probKromosom = tmpkromosomSelection.filter((e)=>{ return e.maxprob >= random && e.minprob <= random })
            if(probKromosom.length !== 0){
              console.log('a : '+random)
              kromosomSelection.push(probKromosom[0])
              tmpkromosomSelection.splice(tmpkromosomSelection.indexOf(probKromosom[0]),1)
            }
          }
          kromosomI = _.cloneDeep(kromosomSelection)
        }
        // kromosomI.map(i => {
        //   console.log("fitness: "+i.fitness)
        //   if(i.fitness )
        // })
        if(kromosomI.filter((e)=>{return e.fitness === 1}).length !== 0){
          console.log(it)
          break;
        }
        if(stoplist.indexOf(it+1) !== -1){
          let rmse1 = kromosomI.map(item => item.fitness).reduce((prev, next) => prev + next)
          let rmse2 = Math.sqrt((n-rmse1)/n)
          let restouser = {I:kromosomI}
          listres.push({iterasi: it+1, data: restouser, total: rmse1.toFixed(2), RMSE: rmse2.toFixed(2)})
        }
      }
      res.status(200).send(listres)
    })
  }
}
//funcation algoritma
function crossover(induk){
  const coRate = 0.7 //crossover rate
  let tmpinduk = _.cloneDeep(induk)
  tmpinduk.map(item => {
    //random nilai dari 0 sampai 1 (ex: 0.55,0.13,0.24)
    let tmpx = Math.round(((Math.random() * 1) + 0) * 100) / 100 
    if(tmpx < coRate){
      // random nilai dari 2 sampai panjang reservasi - 1 
      // (ex: total reservasi = 20 maka di random nilai dari 2 sampai 19)
      // karena Array dimulai dari 0 maka random di mulai dari (1 s/d 18)
      let coRandomSplit = Math.floor((Math.random() * (item[0].length-2))) + 1
      let krimA = item[0].slice(coRandomSplit, item[0].length)
      item[0].splice(coRandomSplit, item[0].length - 1)
      let krimB = item[1].slice(coRandomSplit, item[1].length)
      item[1].splice(coRandomSplit, item[1].length - 1)
      item[0] = item[0].concat(krimB)
      item[1] = item[1].concat(krimA)
      // krimsonM = krimsonM.concat(krimsonR[ix]).concat(krimsonR[ix + 1])
    } else {
      let removeIndex = induk.indexOf(item)
      induk.splice(removeIndex,1)
    }
  })
}
function mutasi(kromosomMutasi,SeatsTotal,Resto){
  let mutasionRate = 0.1 // mutasi rate
  let genMutasi = mutasionRate * kromosomMutasi.length // probabilitas totalgen
  // perulangan sebanyak probabilitas
  for (let i = 0; i < genMutasi; i++) { 
    // nilai random dari 0 s/d 1
    let tmpx = Math.round(((Math.random() * 1) + 0) * 100) / 100
    // jika nilai random lebih kecil dari mutasi rate
    if (tmpx < mutasionRate) {
      if (kromosomMutasi.length !== 0) {
        // nilai random dari 0 s/d total gen sisa setelah croosover
        let tmpM = Math.floor((Math.random() * (kromosomMutasi.length - 1)) + 0);
        // variable jumalah seat yang cocok dengan kromosom yang akan di mutasi
        let st = SeatsTotal.filter((e) => { return e.seatFrom <= kromosomMutasi[tmpM].totalSeats && e.seatEnd >= kromosomMutasi[tmpM].totalSeats })
        // variable seat yang cocok dengan kromosom yang akan di mutasi
        let tmp = Resto.Seats.filter((e) => { return e.seatFrom <= kromosomMutasi[tmpM].totalSeats && e.seatEnd >= kromosomMutasi[tmpM].totalSeats })
        // nilai random dari 0 s/d jumlah seat (st)
        let x = Math.floor((Math.random() * st[0].count) + 0);
        // tukar seat kromosom yang akan di mutasi dengan hasil random
        kromosomMutasi[tmpM].seatId = tmp[x].Id
      }
    }
  }
}
function movingOneOperation(kromosomVND1,Resto){
  // Perulangan Kromosom
  kromosomVND1.forEach((val,index) => {
    // get Id Reservasi Bentrok Per kromosom
    let IdReservasiBentrok = ReservasiBentrok(val)
    // Perulangan ID Reservasi Bentrok
    IdReservasiBentrok.forEach((IdBentrok,index)=>{
      // Split ID reservasi Bentrok (['01,02'] -> ['01','02'])
      let splitBentrok = IdBentrok.split(',')
      // ambil data kromosom == Id reservasi Bentrok
      let kromosomBentrok = val.filter((e) => { return e.reserveId === splitBentrok[0] })[0]
      // simpan SeatId di kromosom bentrok di variable tmp
      let backupkromosomSeat = kromosomBentrok.seatId
      // kosongkan SeatId Kromosom Bentrok
      kromosomBentrok.seatId = '-'
      // Ambil Seat Yang cocok untuk kromosom Bentrok
      let listSeatBentrok = Resto.Seats.filter((e) => { return e.seatFrom <= kromosomBentrok.totalSeats && e.seatEnd >= kromosomBentrok.totalSeats })
      // Perulangan Seat Yang cocok untuk kromosom Bentrok
      for(let i = 0; i< listSeatBentrok.length;i++){
        // Pengecekan Ketersediaan Tempat duduk yang cocok dan tidak bentrok
        if (val.filter((e) => { return e.seatId === listSeatBentrok[i].Id && dateCheckComplete(e.timeS,e.timeE,kromosomBentrok.timeS,kromosomBentrok.timeE)}).length === 0) {
          kromosomBentrok.seatId = listSeatBentrok[i].Id
          break
        }
      }
      // Jika Tidak ditemukan Tempat duduk yang cocok dan tidak bentrok
      if(kromosomBentrok.seatId == '-'){
        // Kembalikan SeatId kromosom 
        kromosomBentrok.seatId = backupkromosomSeat
        // Ulang Pengecekan ketersedian tempat duduk yang cocok dengan kromosom Bentrok kedua
        let kromosomBentrok2 = val.filter((e) => { return e.reserveId === splitBentrok[1] })[0]
        let backupkromosomSeat2 = kromosomBentrok2.seatId
        kromosomBentrok2.seatId = '-'
        let listSeatBentrok2 = Resto.Seats.filter((e) => { return e.seatFrom <= kromosomBentrok2.totalSeats && e.seatEnd >= kromosomBentrok2.totalSeats })
        for(let i = 0; i< listSeatBentrok2.length;i++){
          if (val.filter((e) => { return e.seatId === listSeatBentrok2[i].Id && dateCheckComplete(e.timeS,e.timeE,kromosomBentrok2.timeS,kromosomBentrok2.timeE)}).length === 0) {
            kromosomBentrok2.seatId = listSeatBentrok2[i].Id
            break
          }
        }
        if(kromosomBentrok2.seatId === '-'){
          kromosomBentrok2.seatId = backupkromosomSeat2
        }
      }
    })
  })
}
function MovingTwoOperation(kromosomVND1,Resto,tmp){
  // Perulangan Kromosom
  kromosomVND1.forEach((val,index) => {
    // get Id Reservasi Bentrok Per kromosom
    let IdReservasiBentrok = ReservasiBentrok(val)
    // console.log(IdReservasiBentrok)
    // Perulangan ID Reservasi Bentrok
    IdReservasiBentrok.forEach((IdBentrok,index)=>{
      // Split ID reservasi Bentrok (['01,02'] -> ['01','02'])
      let splitBentrok = IdBentrok.split(',')
      // ambil data kromosom == Id reservasi Bentrok
      let kromosomBentrok = val.filter((e) => { return e.reserveId === splitBentrok[0] })[0]
      let kromosomBentrok2 = val.filter((e) => { return e.reserveId === splitBentrok[1] })[0]
      let genv = []
      let SeatBentrok = Resto.Seats.filter((e) => { return e.seatFrom <= kromosomBentrok.totalSeats && e.seatEnd >= kromosomBentrok.totalSeats })
      SeatBentrok.forEach((seat,index)=>{
        val.filter((e) => { return e.seatId === seat.Id && e.reserveId != kromosomBentrok.reserveId && e.reserveId != kromosomBentrok2.reserveId && dateCheckComplete(kromosomBentrok.timeS,kromosomBentrok.timeE,e.timeS,e.timeE)}).forEach((tmp,index)=>{
          genv.push(tmp)
        })
      })
      tmp = tmp.concat(_.cloneDeep(genv))
      if(genv.length !== 0 ){
        let bckup = kromosomBentrok.seatId
        kromosomBentrok.seatId = '-'
        for(let xi = 0 ; xi<genv.length;xi++){
          let bckup2 = genv[xi].seatId
          kromosomBentrok.seatId = genv[xi].seatId
          genv[xi].seatId = '-'
          for(let i = 0; i< SeatBentrok.length;i++){
            if (val.filter((e) => { return e.seatId === SeatBentrok[i].Id && dateCheckCompleteVND2(genv[xi].timeS,genv[xi].timeE,e.timeS,e.timeE)}).length === 0) {
              genv[xi].seatId = SeatBentrok[i].Id
              break
            }
          }
          if(genv[xi].seatId === '-'){
            kromosomBentrok.seatId = '-'
            genv[xi].seatId = bckup2
          } else {
            break
          }
        }
        if(kromosomBentrok.seatId === '-'){
          kromosomBentrok.seatId = bckup
          let bckup2 = kromosomBentrok2.seatId
          kromosomBentrok2.seatId = '-'
          for(let xi = 0 ; xi<genv.length;xi++){
            let bckup3 = genv[xi].seatId
            kromosomBentrok2.seatId = genv[xi].seatId
            genv[xi].seatId = '-'
            for(let i = 0; i< SeatBentrok.length;i++){
              // Pengecekan Ketersediaan Tempat duduk yang cocok dan tidak bentrok
              if (val.filter((e) => { return e.seatId === SeatBentrok[i].Id && dateCheckCompleteVND2(genv[xi].timeS,genv[xi].timeE,e.timeS,e.timeE)}).length === 0) {
                genv[xi].seatId = SeatBentrok[i].Id
                break
              }
            }
            if(genv[xi].seatId === '-'){
              kromosomBentrok2.seatId = '-'
              genv[xi].seatId = bckup3
            } else {
              break
            }
          }
          if(kromosomBentrok2.seatId === '-'){
            kromosomBentrok2.seatId = bckup2
          }
        }
      }
    })
  })
}
//function helper
function dateCheckComplete(from, to, check , check2) {
  var fromD, toD, checkD,check2D;
  fromD = Date.parse(from);
  toD = Date.parse(to);
  checkD = Date.parse(check);
  check2D = Date.parse(check2);
  if ((checkD > fromD && checkD < toD) || (check2D > fromD && check2D < toD) || ((fromD === checkD) && (toD === check2D))) {
    return true;
  }
  return false;
}

function dateCheckCompleteVND2(from, to, check , check2) {
  var fromD, toD, checkD,check2D;
  fromD = Date.parse(from);
  toD = Date.parse(to);
  checkD = Date.parse(check);
  check2D = Date.parse(check2);
  if (
    (checkD > fromD && checkD < toD) || 
    (check2D > fromD && check2D < toD) || 
    (fromD === checkD && toD === check2D) || 
    (fromD > checkD && fromD < check2D) || 
    (toD > checkD && toD < checkD)) {
    return true;
  }
  return false;
}

function ReservasiBentrok(x){
  let xtmp = []
  x.forEach((a, pindex) => {
    x.forEach((b, nindex) => {
      if(a.reserveId != b.reserveId){
        if(dateCheckComplete(b.timeS,b.timeE,a.timeS,a.timeE)){
          if(a.seatId == b.seatId){
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

function getkromosomMutasi(x) {
  let xtmp = []
  x.map(a => {
    a[0].map(x => {
      xtmp.push(x)
    })
    a[1].map(x => {
      xtmp.push(x)
    })
  })
  return xtmp
}

function getkromosomVND1(kromosom,totalgen){
  let x = _.cloneDeep(kromosom)
  let tmpx = []
  for (let i = 0; i < x.length / totalgen; i++) {
    tmpx.push(x.slice(i * totalgen, (i + 1) * totalgen))
  }
  return tmpx
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

function getBestFitness(kromosomA,kromosomC,kromosomF,kromosomG,kromosomH) {
  let xtmp = []
  kromosomA.map(a=>{
    xtmp.push({fitness: hitungnilaifitness(a), kromosom: a})
  })
  kromosomC.map(a=>{
    xtmp.push({fitness: hitungnilaifitness(a), kromosom: a})
  })
  kromosomF.map(a=>{
    xtmp.push({fitness: hitungnilaifitness(a), kromosom: a})
  })
  kromosomG.map(a=>{
    xtmp.push({fitness: hitungnilaifitness(a), kromosom: a})
  })
  kromosomH.map(a=>{
    xtmp.push({fitness: hitungnilaifitness(a), kromosom: a})
  })
  return xtmp.sort(compare)
}

function hitungnilaifitness(val) {
  let a = 1 // nilai fitness
  let IdReservasiBentrok = ReservasiBentrok(val)
  return  Math.round((1 / (IdReservasiBentrok.length + a))*100)/100
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
  return _.cloneDeep(krimsonR)
}

function saveCOkromosom(induk) {
  let xtmp = []
  induk.map(a => {
    xtmp.push(a[0])
    xtmp.push(a[1])
  })
  return _.cloneDeep(xtmp)
}

function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.fitness
  const genreB = b.fitness

  let comparison = 0;
  if (genreA < genreB) {
    comparison = 1;
  } else if (genreA > genreB) {
    comparison = -1;
  }
  return comparison;
}

function compare2(a, b) {
  // Use toUpperCase() to ignore character casing
  const genreA = a.prob
  const genreB = b.prob

  let comparison = 0;
  if (genreA > genreB) {
    comparison = 1;
  } else if (genreA < genreB) {
    comparison = -1;
  }
  return comparison;
}

async function getListReservation(Id) {
  let reservationList
  await Models.Tb_User_Reservation.findAll({
    where: { Status: 2, RestoId: Id }
  }).then(list => {
    reservationList = list
  }).catch(err => {
    console.log(err)
    reservationList = []
  })
  return reservationList
}