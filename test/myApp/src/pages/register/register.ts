import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HostProvider } from '../../providers/host/host';
import { HomePage } from '../home/home';
import { VerificationPage } from '../verification/verification';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  confirmpassword: AbstractControl;
  fullName: AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public hostService: HostProvider) {
    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      confirmpassword: ['', Validators.compose([Validators.required])],
      fullName: ['', Validators.compose([Validators.required])],
    });
  }
  onSubmit(value: any): void { 
    if(this.authForm.valid) {
      if(this.authForm.value.password === this.authForm.value.confirmpassword){
        this.authForm.value.Id = this.guid()
        this.hostService.signUp(this.authForm.value).then(cb => {

          // localStorage.setItem('authToken', cb.data.token)
          this.navCtrl.setRoot(VerificationPage)
        }).catch(err => {
          this.hostService.presentToast('Failed To Register')
        })
      }else {
        this.hostService.presentToast('New Password & Confirmation Password Not Match')
      }
    }
  }
  guid () {
    function s4 () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1)
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
  }
}
