import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HostProvider } from '../../providers/host/host';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {
  authForm: FormGroup;
  newpass: AbstractControl;
  pass: AbstractControl;
  confpassword: AbstractControl;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public hostService: HostProvider) {
    this.authForm = formBuilder.group({
      newpass: ['', Validators.compose([Validators.required])],
      pass: ['', Validators.compose([Validators.required])],
      confpassword: ['', Validators.compose([Validators.required])]
    });
  }

  onSubmit(value: any): void { 
    if(this.authForm.valid) {
      if(this.authForm.value.newpass === this.authForm.value.confpassword){
        this.hostService.checkAuth().then(cb => {
          this.authForm.value.Id = cb.data.user.Id
          this.hostService.changePass(this.authForm.value).then(cb2 => {
            this.navCtrl.pop()
            this.hostService.presentToast('Change Password Success')
          }).catch(err => {
            this.hostService.presentToast('Something Error')
          })
        })
      }else {
        this.hostService.presentToast('New Password & Confirmation Password Not Match')
      }
    }
  }
}
