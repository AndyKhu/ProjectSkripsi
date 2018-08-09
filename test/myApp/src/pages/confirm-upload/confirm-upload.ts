import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HostProvider } from '../../providers/host/host';
/**
 * Generated class for the ConfirmUploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-confirm-upload',
  templateUrl: 'confirm-upload.html',
})
export class ConfirmUploadPage {
  bankitem:any
  data: any
  form: {
    Id: any,
    BankId: any,
    TransferDt: any,
    SenderName: any,
    Nominal: any,
    src: any,
    Id_Reserve: any,
    PID: any
  }
  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams,public hostService: HostProvider) {
    
    this.data = navParams.get('item')
    console.log(this.data)
    this.form = {
      Id: this.data.Upload?this.data.Upload.Id:null,
      BankId: '',
      TransferDt: new Date().toISOString(),
      SenderName: this.data.Name,
      Nominal: Number.parseFloat(this.data.Cost).toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&,'),
      src: '',
      Id_Reserve: this.data.Id,
      PID: this.data.Upload?this.data.Upload.PID:null
    }
    this.bankitem = []
    this.data.Resto.Account.forEach((val, index) => {
      this.bankitem.push({caption: val.BankName + ' - ' + val.AccountNumber, value: val.Id})
    })
  }

  upload() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
    this.camera.getPicture(options).then((imageData) => {
      this.form.src = 'data:image/jpeg;base64,' + imageData
    }, (err) => {
      console.log(err);
      this.hostService.presentToast(err)
    });
  }
  
  checkValid () {
    if (!this.form.src) {
      this.hostService.presentToast('Receipt Attachment Required')
      return false
    } else if (!this.form.SenderName || this.form.SenderName === '') {
      this.hostService.presentToast('Sender Name Required')
      return false
    } else if (!this.form.BankId || this.form.BankId === '') {
      this.hostService.presentToast('Bank Required')
      return false
    } else return true
  }

  confirmDialog () {
    if (this.checkValid()) {
      this.hostService.HistoryReservationUpload(this.form).then(res => {
        this.hostService.presentToast('Upload Success')
        this.navParams.get('parent').refreshData()
        this.navCtrl.pop()
      })
    }
  }
}
