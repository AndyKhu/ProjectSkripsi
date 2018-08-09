import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmUploadPage } from './confirm-upload';

@NgModule({
  declarations: [
    ConfirmUploadPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmUploadPage),
  ],
})
export class ConfirmUploadPageModule {}
