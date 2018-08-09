import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { DomSanitizer } from '@angular/platform-browser';
import { BillPage } from '../bill/bill';
import moment from 'moment'
/**
 * Generated class for the RestoReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resto-reserve',
  templateUrl: 'resto-reserve.html',
})
export class RestoReservePage {
  data:any
  type:any
  resto:any
  user:any
  load:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public sanitizer: DomSanitizer,public hostService: HostProvider) {
    let tommorow = new Date()
    tommorow.setDate(new Date().getDate() + 1)
    this.load = 'load'
    let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    this.type = true
    this.data = {}
    this.data.reserveDate = tommorow.toISOString()
    hostService.getRestoDetail(navParams.get('Id')).then(cb => {
      this.resto = cb.data      
      hostService.checkAuth().then(cb => {
        this.user = cb.data.user
        this.data.Name = this.user.fullName
        this.data.Phone = this.user.Phone
      })
      this.data.Duration = 60
      this.data.totalSeats = 1
      delete this.resto.Gallery
      delete this.resto.Reviews
      this.resto.FoodMenu.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        delete val.file
      })
      this.resto.OT = moment(this.resto.OpenTime).format('HH:mm')
      this.resto.CT = moment(this.resto.CloseTime).format('HH:mm')
      this.resto.OD = day[this.resto.OpenDay-1]
      this.resto.CD = day[this.resto.CloseDay-1]
      this.load = 'active'
    })
  }
  next () {
    if (this.validate()) {
      this.type = false
    }
  }
  validate () {
    let a = new Date()
    a.setDate(new Date().getDate() + 1)
    a.setMinutes(0)
    let reservedt = moment(moment(new Date(this.data.reserveDate.replace("Z",""))).format('DD MMM YYYY'), 'DD MMM YYYY').toDate()
    let todaydt = moment(moment(new Date(a)).format('DD MMM YYYY'), 'DD MMM YYYY').toDate()
    let reserveTime = moment(moment(new Date(this.data.reserveDate.replace("Z",""))).format('HH:mm'), 'HH:mm').toDate()
    let reserveEnd = moment(reserveTime).add(this.data.Duration, 'minutes').toDate()
    let OpenTime = moment(moment(new Date(this.resto.OpenTime)).format('HH:mm'), 'HH:mm').toDate()
    let CloseTime = moment(moment(new Date(this.resto.CloseTime)).format('HH:mm'), 'HH:mm').toDate()
    if (this.data.Phone === null || this.data.Phone === '' || this.data.Phone === undefined) {
      this.hostService.presentToast(`Phone Can't be Empty`)
      return false
    } else if (OpenTime > reserveTime) {
      this.hostService.presentToast( `Please Select Another Time ( Resto Not Open Yet )`)
      return false
    } else if (CloseTime < reserveTime) {
      this.hostService.presentToast( `Please Select Another Time ( Resto Closed Already )`)
      return false
    } else if (CloseTime < reserveEnd) {
      this.hostService.presentToast( `Please Select Another Time ( Resto Closed Already )`)
      return false
    } else if (reservedt < todaydt) {
      this.hostService.presentToast( `reserve date can't be < tomorrow`)
      return false
    }
    return true
  }
  Reserve () {
    this.data.FoodMenu = this.resto.FoodMenu.filter(o => o.Amount)
    this.data.RestoId = this.resto.Id
    this.data.Id_User = this.user.Id
    this.data.Status = 1
    this.data.reserveDate = new Date(this.data.reserveDate.replace("Z",""))
    this.data.Cost = this.resto.ReservePrice * (this.data.Duration / 60)
    if (this.data.FoodMenu.length === 0) {
      this.hostService.presentToast(`Menu Can't be Empty`)
    } else {
      this.hostService.saveRestoReserve(this.data).then(res => {
        this.hostService.getReservationHistoryOne(res.data.Id).then(cb => {
          console.log(cb.data)
          this.hostService.presentToast(`Reserve Sucess`)
          this.navCtrl.setRoot(BillPage,{data: cb.data, back: true})
        })
        // this.$router.push({name: 'Bill', params: { id: res.data.Id }})
      }).catch(err => {
        console.log(err)
        this.hostService.presentToast('Reserve Failed')
      })
    }
  }

  formatTitle (string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1)
  }

  priceFormated (value) {
    let tmp = value
    if (value < 1000) return tmp
    // else return tmp.slice(0, tmp.length - 3)
    else return (tmp / 1000).toFixed(1)
  }
}
