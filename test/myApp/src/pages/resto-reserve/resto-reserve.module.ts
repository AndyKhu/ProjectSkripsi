import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RestoReservePage } from './resto-reserve';

@NgModule({
  declarations: [
    RestoReservePage,
  ],
  imports: [
    IonicPageModule.forChild(RestoReservePage),
  ],
})
export class RestoReservePageModule {}
