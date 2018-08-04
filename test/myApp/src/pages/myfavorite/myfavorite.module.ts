import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyfavoritePage } from './myfavorite';

@NgModule({
  declarations: [
    MyfavoritePage,
  ],
  imports: [
    IonicPageModule.forChild(MyfavoritePage),
  ],
})
export class MyfavoritePageModule {}
