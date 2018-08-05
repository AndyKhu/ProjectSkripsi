import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { DomSanitizer } from '@angular/platform-browser';
import { BillPage } from '../bill/bill';
import moment from 'moment'
/**
 * Generated class for the HistorypageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historypage-detail',
  templateUrl: 'historypage-detail.html',
})
export class HistorypageDetailPage {
  segment:any
  forms:any
  data:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public sanitizer: DomSanitizer,public hostService: HostProvider) {
    this.data = navParams.get('data')
    this.segment = 'form'
    this.forms = true
  }
  
  toBill(){
    this.segment = 'form'
    this.navCtrl.push(BillPage,{data: this.data,back: false})
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
