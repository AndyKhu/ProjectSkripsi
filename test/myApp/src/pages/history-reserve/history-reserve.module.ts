import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoryReservePage } from './history-reserve';

@NgModule({
  declarations: [
    HistoryReservePage,
  ],
  imports: [
    IonicPageModule.forChild(HistoryReservePage),
  ],
})
export class HistoryReservePageModule {}
