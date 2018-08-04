import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the MyfavoritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myfavorite',
  templateUrl: 'myfavorite.html',
})
export class MyfavoritePage {
  user:any
  listFavorite:any
  constructor(public sanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams,public hostService: HostProvider) {
    hostService.checkAuth().then(cb => {
      this.user = cb.data.user
      hostService.getUserFavorite(this.user.Id).then(res => {
        this.listFavorite = res.data
        this.listFavorite.forEach((val, index) => {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        })
      })
    })
  }
  deleteFav (n) {
    let data = {userId: this.user.Id, restoId: n.Id_Resto, status: false}
    this.hostService.updateFavorite(data).then(cb => {
      this.listFavorite.splice(this.listFavorite.indexOf(n), 1)
      this.hostService.presentToast('Delete Success')
    })
  }
}
