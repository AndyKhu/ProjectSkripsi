import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { MyfavoritePage } from '../pages/myfavorite/myfavorite';
import { MyprofilePage } from '../pages/myprofile/myprofile';
import { HistoryReservePage } from '../pages/history-reserve/history-reserve';
import { AuthPage } from '../pages/auth/auth';
import { HostProvider } from '../providers/host/host';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  pages: Array<{title: string, component: any, icon: string}>;
  accountpages: Array<{title: string, component: any, icon: string}>;
  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public hostService: HostProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.s
      statusBar.styleDefault();
      splashScreen.hide();
       // used for an example of ngFor and navigation
      this.pages = [
        // { title: 'Home', component: HomePage, icon: 'md-home'},
        { title: 'Reservation History', component: HistoryReservePage, icon: 'md-refresh-circle' },
        { title: 'My Favorite', component: MyfavoritePage, icon: 'md-restaurant'}
      ];
      this.accountpages = [{ title: 'My Profile', component: MyprofilePage, icon: 'md-contact'}]
      this.checkPreviousAuthorization();
    });
  }

  logout () {
    localStorage.removeItem('authToken')
    this.nav.setRoot(AuthPage)
  }

  checkPreviousAuthorization(): void { 
    if((window.localStorage.getItem('authToken') === "undefined" || window.localStorage.getItem('authToken') === null)) {
      this.nav.setRoot(AuthPage)
    } else {
      this.hostService.checkAuth().then(cb => {
        this.nav.setRoot(HomePage)
      }).catch(err => {
        this.nav.setRoot(AuthPage)
      })
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.title === 'Home') this.nav.setRoot(page.component)
    else this.nav.push(page.component);
  }

}

