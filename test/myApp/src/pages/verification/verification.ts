import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthPage } from '../auth/auth';
/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  status:any
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.status='active'
  }
  back() {
    this.navCtrl.setRoot(AuthPage)
  }
}
