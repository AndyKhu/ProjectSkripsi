import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MyfavoritePage } from '../pages/myfavorite/myfavorite';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { AuthPage } from '../pages/auth/auth';
import { RegisterPage } from '../pages/register/register';
import { ChangePasswordPage } from '../pages/change-password/change-password';
import { RestoDetailPage } from '../pages/resto-detail/resto-detail';
import { RestoReservePage} from '../pages/resto-reserve/resto-reserve'
import { HistoryReservePage } from '../pages/history-reserve/history-reserve';
import { HistorypageDetailPage } from '../pages/historypage-detail/historypage-detail';
import { HostProvider } from '../providers/host/host';
// import { RestoInfoComponent } from '../components/resto-info/resto-info'
import { ComponentsModule } from '../components/components.module'
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AuthPage,
    MyfavoritePage,
    MyprofilePage,
    RestoDetailPage,
    RestoReservePage,
    HistoryReservePage,
    HistorypageDetailPage,
    ChangePasswordPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    Ionic2RatingModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AuthPage,
    MyfavoritePage,
    MyprofilePage,
    RestoReservePage,
    RestoDetailPage,
    HistoryReservePage,
    ChangePasswordPage,
    HistorypageDetailPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HostProvider,
    FileTransfer,
    FileTransferObject,
    File,
    Camera
  ]
})
export class AppModule {}
