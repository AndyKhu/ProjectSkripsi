import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestoDetailPage } from './resto-detail';

@NgModule({
  declarations: [
    RestoDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(RestoDetailPage),
  ],
})
export class RestoDetailPageModule {}
