import { Component } from '@angular/core';
import { IonicPage,AlertController, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { HostProvider } from '../../providers/host/host';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { AuthPage } from '../../pages/auth/auth';
import { ChangePasswordPage } from '../../pages/change-password/change-password';
/**
 * Generated class for the MyprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myprofile',
  templateUrl: 'myprofile.html',
})
export class MyprofilePage {
  data:any
  status:any
  imageURI:any;
  imageFileName:any;
  dp:any;
  constructor(public alertCtrl: AlertController,public sanitizer: DomSanitizer,public navCtrl: NavController, public navParams: NavParams,public hostService: HostProvider,
    private camera: Camera,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController) {
    this.status = 'loading'
    hostService.checkAuth().then(cb => {
      this.data = cb.data.user
      if (this.data.DpId) {
        hostService.getProfilePicture(this.data).then(res => {
          let x = new Blob([new Uint8Array(res.data.file.data)])
          this.data.src = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(x))
          this.status = 'active'
        })
      } else {
        this.status = 'active'
      }
    })
  }

  validate () {
    if (this.data.fullName === null || this.data.fullName === '') {
      this.hostService.presentToast(`Name Can't be Empty`)
      return false
    } else if (this.data.Phone === null || this.data.Phone === '') {
      this.hostService.presentToast(`Phone Can't be Empty`)
      return false
    }
    return true
  }

  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.data.src = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err);
      this.hostService.presentToast(err)
    });
  }

  update () {
    if (this.validate()) {
      this.hostService.updateProfile(this.data).then(res => {
        this.hostService.presentToast('Update Success')
      })
    }
  }
  toChangePassword () {
    this.navCtrl.push(ChangePasswordPage)
  }
  closeConfirm () {
    this.alertCtrl.create({
      title: 'Confirm',
      message: 'Are you sure want to Close Your Account ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.hostService.closeAccount(this.data).then(cb => {
              localStorage.removeItem('authToken')
              // this.$router.push('/')
              this.navCtrl.setRoot(AuthPage)
            }).catch(err => {
              console.log(err)
              this.hostService.presentToast('Failed To Close Account')
            })
          }
        }
      ]
    }).present()
  }
}
