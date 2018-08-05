import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HomePage} from '../home/home'

/**
 * Generated class for the BillPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bill',
  templateUrl: 'bill.html',
})
export class BillPage {
  data:any
  back:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.back = navParams.get('back')
    this.data = navParams.get('data')
  }
  menitToHour(value) {
    if (!value) return ''
    if (value % 60 === 0) return parseInt((value / 60).toString()) + ' Hours '
    return parseInt((value / 60).toString()) + ' Hours ' + (value % 60) + ' Minute'
  }

  backtoHome() {
    this.navCtrl.setRoot(HomePage)
  }
}
