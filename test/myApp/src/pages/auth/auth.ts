import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HostProvider } from '../../providers/host/host';

import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';

/**
 * Generated class for the AuthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage {
  authForm: FormGroup;
  email: AbstractControl;
  password: AbstractControl;
  register: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public hostService: HostProvider) {
    this.register = HomePage
    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(value: any): void { 
    if(this.authForm.valid) {
      this.hostService.login(this.authForm.value).then(cb => {
        if (cb.data.user.Type === 'Member') {
          localStorage.setItem('authToken', cb.data.token)
          this.navCtrl.setRoot(HomePage);
        } else {
          this.hostService.presentToast('Only Member Can Login') 
        }
      }).catch(err => {
        this.hostService.presentToast('Failed To Login')
      })
    }
  }
  toRegister () {
    this.navCtrl.push(RegisterPage)
  }
}
