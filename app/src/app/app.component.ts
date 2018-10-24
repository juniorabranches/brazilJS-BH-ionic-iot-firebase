import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireAuth  } from 'angularfire2/auth';
import firebase from 'firebase';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'HomePage';
  fireAuth: any;  
  constructor(public loadingCtrl: LoadingController, public platform: Platform,
    public splashScreen: SplashScreen, public af: AngularFireAuth) {
    this.fireAuth = firebase.auth();
    this.initializeApp();
  }

  initializeApp(){
    this.platform.ready().then(() => {
        this.rootPage = 'HomePage';
    });
  }


}

