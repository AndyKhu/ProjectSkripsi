import { Component , Input} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HostProvider } from '../../providers/host/host';
/**
 * Generated class for the RestoReviewsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'resto-reviews',
  templateUrl: 'resto-reviews.html'
})
export class RestoReviewsComponent {

  @Input() resto: any
  rvChart:any
  max:any
  user:any
  data: any
  constructor(public sanitizer: DomSanitizer,public hostService: HostProvider) {
    this.data = {}
    this.data.rate = 1
    hostService.checkAuth().then(cb => {
      this.user = cb.data.user
    })
  }

  public getData() {
    this.updateRv ()
    this.data.Id_Resto = this.resto.Id
    return true
  }
  
  updateRv () {
    this.rvChart = []
    for (let i = 1; i <= 5; i++) {
      this.rvChart.push(this.resto.Reviews.filter(o => o.rate === i).length)
    }
    this.max = Math.max.apply(Math, this.rvChart)
  }

  sendReview () {
    if (this.user !== null && this.data.comment !== null && this.data.comment !== '' && this.data.comment !== undefined && this.data.rate !== null  && this.data.rate !== undefined && this.user.Reservation.filter(e => { return e.RestoId === this.resto.Id }).length !== 0) {
      this.data.userId = this.user.Id
      this.data.userName = this.user.fullName
      this.data.PID = this.user.DpId
      this.data.Status = 0
      this.hostService.saveRestoReview(this.data).then(res => {
        let tmp = this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })
        if (tmp.length === 0) {
          if (res.data.file) {
            let x = new Blob([new Uint8Array(res.data.file.data)])
            res.data.src = URL.createObjectURL(x)
            delete res.data.file
          }
          this.resto.Reviews.push(res.data)
        } else {
          this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })[0].comment = this.data.comment
          this.resto.Reviews.filter((e) => { return e.userId === this.data.userId && e.Id_Resto === this.data.Id_Resto && e.Status !== 2 })[0].rate = this.data.rate
        }
        this.resto.Rate = this.resto.Reviews.map(item => item.rate).reduce((prev, next) => prev + next) / this.resto.Reviews.length
        this.hostService.updateTbRestoRate(this.resto.Id, this.resto.Rate)
        this.hostService.presentToast('Comment Success')
        this.data = {
          comment:'',
          rate:1,
          userId:'',
          userName:'',
          PID:'',
          Status:'',
          Id_Resto: ''
        }
        this.updateRv()
      }).catch(err => {
        console.log(err)
        this.hostService.presentToast('Comment Failed')
      })
    } else {
      this.hostService.presentToast(this.data.comment ? this.data.rate ? this.user.Reservation.filter(e => { return e.RestoId === this.resto.Id }).length !== 0 ? 'Login First' : 'you must be reserve at least 1x to review' : `Rate Can't be empty` : `Comment Can't be empty`)
    }
  }
}
