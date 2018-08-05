const Models = require('../models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const del = require('del')
const env = process.env.NODE_ENV || 'development'
const config = require(`${__dirname}/../config/config.json`)[env]
let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable])
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config
  )
}
//for read Image
const fs = require('fs')
const path = require('path')
//default
function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
}
module.exports = {
  getListRestaurantTrending(req, res, next) {
    Models.Tb_Resto.findAll({
      where: { Status: true },
      include: [
        {
          where: { [Op.or]: [{ Type: 'both' }, { Type: 'default' }] },
          model: Models.Tb_Gallery,
          as: 'Gallery',
          attributes: ['Id', 'Type', 'PID', 'Pname', 'Ptype', 'Id_Resto'],
          limit: 1
        }
      ],
      attributes: ['Id', 'Name', 'Description', 'Rate'],
      limit: 3,
      order: [['Rate', 'DESC', 'NULLS Last']]
    }).then((resto) => {
      resto.forEach((rest, ind) => {
        rest.Gallery.forEach((val, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${rest.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
      })
      res.status(200).json({ 'result': resto });
    })
  },
  getCountReservasi(req, res, next) {
    let data = req.body
    sequelize.query(`select count("Id") from public."Tb_User_Reservations" where "RestoId" = '${data.RestoId}' and Date("reserveDate") = Date('${data.Date}')`, { type: Sequelize.QueryTypes.SELECT })
      .then(listH => {
        res.status(200).send(listH)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ error: err })
      })
  },
  getMaxValue(req, res, next) {
    Models.Tb_Resto.findAll({
      attributes: [
        [sequelize.fn('max', sequelize.col('PriceEnd')), 'PriceEnd']
        // etc
      ]
    }).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  closeAccount(req, res, next) {
    Models.Tb_User.update({ Status: false }, { where: { Id: req.body.Id } }).then(cb => {
      if (req.body && req.body.Type === 'AdminResto') {
        Models.Tb_Resto.update({Status:false},{where: {Id_User: req.body.Id}}).then(cb2 => {
          res.status(200).send(cb)  
        })
      } else {
        res.status(200).send(cb)
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getListRestourant(req, res, next) {
    let body = req.body
    let limit = 8;   // number of records per page
    let offset = 0;
    let searchP
    if (body.type === 0) {
      searchP = { Status: true }
    } else if (body.type === 1) {
      searchP = { Status: true, Name: { $iLike: `%${body.search}%` }}
    } else {
      searchP = { Status: true, Type: { $iLike: `%${body.ds === '-'?'':body.ds}%` }, PriceFrom: { $lte: body.price }, PriceEnd: { $gte: body.priceE } }
    }
    Models.Tb_Resto.findAndCountAll({ where: searchP }).then(data => {
      let page = body.page;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Models.Tb_Resto.findAll({
        where: searchP,
        include: [
          {
            where: { Status: true , Type: 'AdminResto'},
            model: Models.Tb_User,
            as: 'User',
            required: true
          },
          {
            where: { [Op.or]: [{ Type: 'both' }, { Type: 'default' }] },
            model: Models.Tb_Gallery,
            as: 'Gallery',
            attributes: ['Id', 'Type', 'PID', 'Pname', 'Ptype', 'Id_Resto'],
            limit: 1
          }
        ],
        attributes: ['Id', 'Name', 'Description', 'Rate'],
        limit: limit,
        offset: offset,
        order: [['createdAt']]
      }).then((resto) => {
        resto.forEach((rest, ind) => {
          rest.Gallery.forEach((val, index) => {
            let bitmap = fs.readFileSync(path.join(`uploads/${rest.Id}/${val.PID}`))
            val.dataValues.file = bitmap
          })
        })
        res.status(200).json({ 'result': resto, 'count': data.count, 'pages': pages });
      });
    }).catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
  },
  getRestoDetailmin(req, res, next) {
    Models.Tb_Resto.findOne({
      where: { Id: req.params.id },
      include: [
        {
          model: Models.Tb_Resto_Account,
          as: 'Account',
          attributes: ['Id', 'BankName', 'AccountNumber', 'Id_Resto']
        },
        {
          model: Models.Tb_Resto_Seat,
          as: 'Seats'
        },
        {
          model: Models.Tb_Resto_Menu,
          as: 'FoodMenu',
          attributes: ['Id', 'Name', 'Price', 'Description', 'PID', 'Pname', 'Ptype']
        }]
    }).then(resto => {
      if (resto === null) {
        res.status(401).send({ err: 'not found' })
      } else {
        resto.FoodMenu.forEach((val, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        res.status(200).send(resto)
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getUserFavorite(req, res, next) {
    sequelize.query(`select a."Id",a."Id_Resto",b."Name",b."Description",c."PID" from public."Tb_User_Favorites" a join public."Tb_Restos" b on b."Id"= a."Id_Resto" left join public."Tb_Galleries" c on b."Id" = c."Id_Resto" where a."Id_User" = '${req.params.id}' and b."Status" and (c."Type" = 'both' or c."Type" = 'default')`, { type: Sequelize.QueryTypes.SELECT })
      .then(listH => {
        listH.forEach((val, index) => {
          if (val.PID) {
            let bitmap = fs.readFileSync(path.join(`uploads/${val.Id_Resto}/${val.PID}`))
            val.file = bitmap
          }
        })
        res.status(200).send(listH)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ error: err })
      })
  },
  HistoryReservationUpload(req, res, next) {
    let data = req.body
    if (!data.Id) {
      data.Id = guid()
      Models.Tb_User_Reservation_Upload.create(data).then(pro3 => {
        Models.Tb_User_Reservation.update({ Status: 1 }, { where: { Id: data.Id_Reserve } }).then(cb => {
          res.status(200).send(data)
        })
      }).catch(err => {
        console.log(err)
        res.status(400).send({ errmsg: 'Failed to Comment' })
      })
    } else {
      if(data.oldPID){
        del.sync([`uploads/${data.Id_Reserve}/${data.oldPID}`]);
      }
      Models.Tb_User_Reservation_Upload.update({
        BankId: data.BankId,
        TransferDt: data.TransferDt,
        SenderName: data.SenderName,
        Nominal: data.Nominal,
        PID: data.PID
      }, {where: {Id: data.Id}}).then(pro3 => {
        res.status(200).send(data)
      }).catch(err => {
        res.status(400).send({ errmsg: 'Failed to Comment' })
      })
    }
  },
  getHistoryReserverById (req, res, next) {
    Models.Tb_User_Reservation.findOne({where: {Id:req.params.id},
      include: [
        {
          model: Models.Tb_User_Reservation_Menu,
          as: 'FoodMenu',
          include: [
            {
              model: Models.Tb_Resto_Menu,
              as: 'Menu'
            }
          ]
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto'
        }
      ]
    }).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      res.status(400).send({ errmsg: 'Failed to Comment' })
    })
  },
  cancelReservation (req,res,next) {
    Models.Tb_User_Reservation.update({Status: 6},{where: {Id: req.params.id}}).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      res.status(400).send({ errmsg: 'Failed to Comment' })
    })
  },
  getReservationHistoryOne (req,res,next) {
    Models.Tb_User_Reservation.findOne({
      where: {Id: req.params.id},
      include: [
        {
          model: Models.Tb_User_Reservation_Menu,
          as: 'FoodMenu',
          include: [
            {
              model: Models.Tb_Resto_Menu,
              as: 'Menu'
            }
          ]
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto'
        }
      ]
    }).then((cb) => {
      cb.dataValues.DurationC = new Date(new Date(cb.reserveDate).getTime() + cb.Duration*60000);
      cb.FoodMenu.forEach((fm, index) => {
        let bitmap = fs.readFileSync(path.join(`uploads/${cb.RestoId}/${fm.Menu.PID}`))
        fm.dataValues.file = bitmap
      })
      res.status(200).send(cb);
    })
  },
  getReservationHistoryPage(req, res, next) {
    let body = req.body
    console.log(body)
    let limit = 4;   // number of records per page
    let offset = 0;
    let searchP
    if (body.type === 0) {
      searchP = {Id_User: body.Id, Status: {$notIn: [4,5,6]}}
    } else if (body.type === 1) {
      searchP = {Id_User:  body.Id, Status: {$in: [4,5,6]}}
    }
    Models.Tb_User_Reservation.findAndCountAll({ where: searchP }).then(data => {
      let page = body.page;      // page number
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      Models.Tb_User_Reservation.findAll({
        where: searchP,
        include: [
          {
            model: Models.Tb_User_Reservation_Menu,
            as: 'FoodMenu',
            include: [
              {
                model: Models.Tb_Resto_Menu,
                as: 'Menu'
              }
            ]
          },
          {
            model: Models.Tb_Resto,
            as: 'Resto',
            include: [
              {
                model: Models.Tb_Gallery,
                as: 'Gallery',
                where: { Type: { $or: ['both', 'type'] } },
                limit: 1
              },
              {
                model: Models.Tb_Resto_Account,
                as: 'Account'
              }
            ]
          },
          {
            model: Models.Tb_User_Reservation_Upload,
            as: 'Upload'
          }
        ],
        limit: limit,
        offset: offset
      }).then((cb) => {
        cb.forEach((val, index) => {
          if (val.Resto.Gallery.length !== 0) {
            let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${val.Resto.Gallery[0].PID}`))
            val.dataValues.file = bitmap
          }
          val.dataValues.DurationC = new Date(new Date(val.reserveDate).getTime() + val.Duration*60000);
          val.FoodMenu.forEach((fm, index) => {
            let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${fm.Menu.PID}`))
            fm.dataValues.file = bitmap
          })
        })
        res.status(200).json({ 'result': cb, 'count': data.count, 'pages': pages });
      });
    }).catch(function (error) {
      res.status(500).send('Internal Server Error');
    });
  },
  getReservationHistory(req, res, next) {
    Models.Tb_User_Reservation.findAll({
      where: { Id_User: req.params.id, Status: {$notIn: [4,5,6]}},
      include: [
        {
          model: Models.Tb_User_Reservation_Menu,
          as: 'FoodMenu',
          include: [
            {
              model: Models.Tb_Resto_Menu,
              as: 'Menu'
            }
          ]
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto',
          include: [
            {
              model: Models.Tb_Gallery,
              as: 'Gallery',
              where: { Type: { $or: ['both', 'type'] } },
              limit: 1
            },
            {
              model: Models.Tb_Resto_Account,
              as: 'Account'
            }
          ]
        },
        {
          model: Models.Tb_User_Reservation_Upload,
          as: 'Upload'
        }
      ]
    }).then(cb => {
      cb.forEach((val, index) => {
        if (val.Resto.Gallery.length !== 0) {
          let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${val.Resto.Gallery[0].PID}`))
          val.dataValues.file = bitmap
        }
        val.dataValues.DurationC = new Date(new Date(val.reserveDate).getTime() + val.Duration*60000);
        val.FoodMenu.forEach((fm, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${fm.Menu.PID}`))
          fm.dataValues.file = bitmap
        })
      })
      res.status(200).send(cb)
    })
  },
  getReservationHistory2(req, res, next) {
    Models.Tb_User_Reservation.findAll({
      where: { Id_User: req.params.id, Status: {$in: [4,5,6]}},
      include: [
        {
          model: Models.Tb_User_Reservation_Menu,
          as: 'FoodMenu',
          include: [
            {
              model: Models.Tb_Resto_Menu,
              as: 'Menu'
            }
          ]
        },
        {
          model: Models.Tb_Resto,
          as: 'Resto',
          include: [
            {
              model: Models.Tb_Gallery,
              as: 'Gallery',
              where: { Type: { $or: ['both', 'type'] } },
              limit: 1
            },
            {
              model: Models.Tb_Resto_Account,
              as: 'Account'
            }
          ]
        },
        {
          model: Models.Tb_User_Reservation_Upload,
          as: 'Upload'
        }
      ]
    }).then(cb => {
      cb.forEach((val, index) => {
        if (val.Resto.Gallery.length !== 0) {
          let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${val.Resto.Gallery[0].PID}`))
          val.dataValues.file = bitmap
        }
        val.dataValues.DurationC = new Date(new Date(val.reserveDate).getTime() + val.Duration*60000);
        val.FoodMenu.forEach((fm, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${val.RestoId}/${fm.Menu.PID}`))
          fm.dataValues.file = bitmap
        })
      })
      res.status(200).send(cb)
    })
  },
  getListBank(req, res, next) {
    Models.Tb_Resto_Account.findAll({ where: { Id_Resto: req.params.id } }).then(cb => {
      res.status(200).send(cb)
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  getRestoDetail(req, res, next) {
    Models.Tb_Resto.findOne({
      where: { Id: req.params.id },
      include: [
        {
          model: Models.Tb_Resto_Fac,
          as: 'Facility',
          attributes: ['Id', 'Icon', 'Id_Resto', 'Name']
        },
        {
          model: Models.Tb_Resto_Seat,
          as: 'Seats',
          attributes: ['Id', 'seatFrom', 'seatEnd', 'noSeat', 'Id_Resto']
        },
        {
          model: Models.Tb_Resto_Account,
          as: 'Account',
          attributes: ['Id', 'BankName', 'AccountNumber', 'Id_Resto']
        },
        {
          model: Models.Tb_Resto_Review,
          where: { Status: { [Op.ne]: 2 } },
          required: false,
          as: 'Reviews',
          attributes: ['Id', 'comment', 'rate', 'userId', 'userName', 'userPID', 'Id_Resto']
        },
        {
          model: Models.Tb_Resto_Menu,
          as: 'FoodMenu',
          attributes: ['Id', 'Name', 'Price', 'Description', 'PID', 'Pname', 'Ptype']
        },
        {
          model: Models.Tb_Gallery,
          as: 'Gallery',
          attributes: ['Id', 'Type', 'PID', 'Pname', 'Ptype', 'Id_Resto']
        }],
      order: [[{ model: Models.Tb_Gallery, as: 'Gallery' }, 'Type', 'ASC']]
    }).then(resto => {
      if (resto === null) {
        res.status(401).send({ err: 'not found' })
      } else {
        resto.Gallery.forEach((val, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        resto.FoodMenu.forEach((val, index) => {
          let bitmap = fs.readFileSync(path.join(`uploads/${resto.Id}/${val.PID}`))
          val.dataValues.file = bitmap
        })
        if (resto.Reviews.length !== 0) {
          let tmp = 0
          resto.Reviews.forEach((val, index) => {
            Models.Tb_User.findOne({
              where: { Id: val.userId },
              attributes: ['Id', 'DpId', 'DpName', 'DpType']
            }).then(cb => {
              if(cb.DpId && cb.DpId !== '') {
                let bitmap = fs.readFileSync(path.join(`uploads/${cb.Id}/${cb.DpId}`))
                val.dataValues.file = bitmap
              }
              tmp += 1
              if (tmp === resto.Reviews.length) {
                res.status(200).send(resto)
              }
            }) 
          })
        } else {
          res.status(200).send(resto)
        }
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ error: err })
    })
  },
  saveRestoReview(req, res, next) {
    let data = req.body
    Models.Tb_Resto_Review.findOne({ where: { userId: data.userId, Id_Resto: data.Id_Resto, Status: { $ne: 2 } } }).then(cb => {
      if (cb === null) {
        data.Id = guid()
        Models.Tb_Resto_Review.create(data).then(pro3 => {
          Models.Tb_User.findOne({
            where: { Id: data.userId },
            attributes: ['Id', 'DpId', 'DpName', 'DpType']
          }).then(cb => {
            if(cb.DpId && cb.DpId !== '') {
              let bitmap = fs.readFileSync(path.join(`uploads/${cb.Id}/${cb.DpId}`))
              pro3.dataValues.file = bitmap
            }
            res.status(200).send(pro3)
          })
        })
      } else {
        Models.Tb_Resto_Review.update({ comment: data.comment, rate: data.rate }, { where: { Id: cb.Id } }).then(pro3 => {
          res.status(200).send({ good: 'lul' })
        })
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ errmsg: 'Failed to Comment' })
    })

  },
updateNotif (req,res,next) {
    Models.Tb_User_Reservation.update({PID: 'old'},{where: {Id_User:req.params.id}}).then(cb => {
      res.status(200).send({ good: 'lul' })
    }).catch(err => {
      console.log(err)
      res.status(400).send({ errmsg: 'Failed to Comment' })
    })
  },
  saveRestoReserve(req, res, next) {
    let data = req.body
    data.Id = guid()
    data.PID = 'new'
    let foodList = []
    data.FoodMenu.forEach((val, index) => {
      foodList.push({ Id: guid(), Amount: val.Amount, MenuId: val.Id, Id_Reserve: data.Id })
    })
    Models.Tb_User_Reservation.create(data).then(pro3 => {
      Models.Tb_User_Reservation_Menu.bulkCreate(foodList).then(pro => {
        data.FoodMenu = foodList
        res.status(200).send(data)
      })
    }).catch(err => {
      console.log(err)
      res.status(400).send({ errmsg: 'Failed to Comment' })
    })
  },
  updateFavorite(req, res, next) {
    let data = req.body
    Models.Tb_User_Favorite.findOne({ where: { Id_User: data.userId, Id_Resto: data.restoId } }).then(fav => {
      if (fav && !data.status) {
        Models.Tb_User_Favorite.destroy({ where: { Id: fav.Id } }).then(pro3 => {
          res.status(200).send({ good: 'lul' })
        })
      } else if (fav === null && data.status) {
        Models.Tb_User_Favorite.create({ Id: guid(), Id_User: data.userId, Id_Resto: data.restoId }).then(pro3 => {
          res.status(200).send(pro3)
        })
      } else {
        res.status(400).send({ errmsg: 'something error please contact admin' })
      }
    }).catch(err => {
      console.log(err)
      res.status(400).send({ errmsg: 'Error' })
    })
  },
  updateProfile(req, res, next) {
    let data = req.body
    if (data.upload)
      del.sync([`uploads/${data.Id}/${data.delete}`])
    Models.Tb_User.update({
      fullName: data.fullName,
      Phone: data.Phone,
      Age: data.Age,
      Weight: data.Weight,
      Height: data.Height,
      DpName: data.DpName,
      DpId: data.DpId,
      DpType: data.DpType
    },
      { where: { Id: data.Id } }).then(hsl => {
        res.status(200).send(hsl)
      }).catch(err => {
        console.log(err)
        res.status(400).send({ errmsg: 'Failed to Update' })
      })
  }
}