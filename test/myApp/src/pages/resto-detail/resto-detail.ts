import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { DomSanitizer } from '@angular/platform-browser';
import {RestoReservePage} from '../resto-reserve/resto-reserve'
import moment from 'moment'
/**
 * Generated class for the RestoDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resto-detail',
  templateUrl: 'resto-detail.html',
})
export class RestoDetailPage {
  resto: any
  user: any
  defsrc: any
  segment: any
  favorite: boolean
  constructor(public sanitizer: DomSanitizer, public navCtrl: NavController, public navParams: NavParams,public hostService: HostProvider) {
    let day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    this.segment = 'info'
    hostService.getRestoDetail(navParams.get('Id')).then(cb => {
      this.resto = cb.data      
      hostService.checkAuth().then(cb => {
        this.user = cb.data.user
        this.cekFavorite()
      })
      this.resto.Gallery.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        if (val.Type === 'both' || val.Type === 'detail') {
          this.defsrc = URL.createObjectURL(x)
        }
        delete val.file
      })
      this.resto.FoodMenu.forEach((val, index) => {
        let x = new Blob([new Uint8Array(val.file.data)])
        val.src = URL.createObjectURL(x)
        delete val.file
      })
      this.resto.Reviews.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        }
      })
      this.resto.OT = moment(this.resto.OpenTime).format('HH:mm')
      this.resto.CT = moment(this.resto.CloseTime).format('HH:mm')
      this.resto.OD = day[this.resto.OpenDay-1]
      this.resto.CD = day[this.resto.CloseDay-1]
      if (this.resto.Reviews.length !== 0) {
        this.resto.totalRate = this.resto.Reviews.map(item => item.rate).reduce((prev, next) => prev + next) / this.resto.Reviews.length
      }
    })
  }

  toReserve () {
    this.navCtrl.push(RestoReservePage,{Id: this.resto.Id})
  }

  setFavorite () {
    let data = {userId: this.user.Id, restoId: this.resto.Id, status: !this.favorite}
    this.hostService.updateFavorite(data).then(res => {
      this.favorite = !this.favorite
      this.hostService.presentToast('Set Favorite Success')
    }).catch(err => {
      console.log(err)
    })
  }
  cekFavorite () {
    if (this.user.UserFavorite.filter((e) => { return e.Id_Resto === this.resto.Id }).length !== 0) {
      this.favorite = true
    } else {
      this.favorite = false
    }
  }
}
