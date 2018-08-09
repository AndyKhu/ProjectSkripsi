import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { HostProvider } from '../../providers/host/host';
import { HistorypageDetailPage } from '../../pages/historypage-detail/historypage-detail';
import { ConfirmUploadPage } from '../../pages/confirm-upload/confirm-upload';

/**
 * Generated class for the HistoryReservePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history-reserve',
  templateUrl: 'history-reserve.html',
})
export class HistoryReservePage {
  data:any
  user:any
  status:any
  totalPage: any
  page: number
  segment: any
  constructor(private alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer: DomSanitizer,public hostService: HostProvider) {
    this.segment = 'inprog'
    this.page = 1
    this.status = 'loading'
    hostService.checkAuth().then(cb => {
      this.user = cb.data.user
      if (this.user) {
        let data = {
          page: this.page,
          type: 0,
          Id: this.user.Id
        }
        hostService.getReservationHistoryPage(data).then(cb => {
          this.totalPage = cb.data.pages
          this.data = cb.data.result
          this.data.forEach((val, index) => {
            if (val.file) {
              let x = new Blob([new Uint8Array(val.file.data)])
              val.src = URL.createObjectURL(x)
              delete val.file
            }
            val.FoodMenu.forEach((fm, index) => {
              if (fm.file) {
                let x = new Blob([new Uint8Array(fm.file.data)])
                fm.src = URL.createObjectURL(x)
                delete fm.file
              }
            })
          })
          this.status = 'active'
        })
      } else {
        this.status = 'active'
      }
    })
  }
  upload (item) {
    this.navCtrl.push(ConfirmUploadPage,{item: item,parent: this})
  }
  refreshData () {
    this.page = 1;
    let data = {
      page: this.page,
      type: this.segment === 'inprog'?0:1,
      Id: this.user.Id
    }
    this.hostService.getReservationHistoryPage(data).then(cb => {
      this.totalPage = cb.data.pages
      cb.data.result.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        }
        val.FoodMenu.forEach((fm, index) => {
          if (fm.file) {
            let x = new Blob([new Uint8Array(fm.file.data)])
            fm.src = URL.createObjectURL(x)
            delete fm.file
          }
        })
      })
      this.data = cb.data.result
    })
  }
  cancel(item) {
    this.alertCtrl.create({
      title: 'Confirm',
      message: 'Do you want to cancel this reservation?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.hostService.cancelReservation(item.Id).then(cb => {
              this.data.splice(this.data.indexOf(item), 1)
            })
          }
        }
      ]
    }).present()
  }
  doInfinite(infiniteScroll) {
    this.page = this.page + 1;
    let data = {
      page: this.page,
      type: this.segment === 'inprog'?0:1,
      Id: this.user.Id
    }
    this.hostService.getReservationHistoryPage(data).then(cb => {
      this.totalPage = cb.data.pages
      cb.data.result.forEach((val, index) => {
        if (val.file) {
          let x = new Blob([new Uint8Array(val.file.data)])
          val.src = URL.createObjectURL(x)
          delete val.file
        }
        val.FoodMenu.forEach((fm, index) => {
          if (fm.file) {
            let x = new Blob([new Uint8Array(fm.file.data)])
            fm.src = URL.createObjectURL(x)
            delete fm.file
          }
        })
      })
      this.data = this.data.concat(cb.data.result)       
      infiniteScroll.complete()
    })
  }

  toDetail (data) {
    this.navCtrl.push(HistorypageDetailPage,{data: data})
  }

  getStatus (val) {
    // 0 request reservation (unpaid)
    // 1 user upload bukti tapi blum di confirm AR (pending)
    // 2 setelah di confirm AR ( paid (unschedule) )
    // 3 Scheduled
    // 4 Rejected
    // 5 Done
    // 6 User Cancel
    return val === 0 ? 'Unpaid' : val === 1 ? 'Pending' : val === 2 ? 'Paid (unschedule)' : val === 3 ? 'Scheduled' : val === 4 ? 'Rejected' : val === 5 ? 'Done' : 'Canceled'
  }

}
