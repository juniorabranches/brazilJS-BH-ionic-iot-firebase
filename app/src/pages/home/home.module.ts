import { HomePage } from './home';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import {FireService} from '../../providers/fire-data'

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ],
  providers: [FireService]
})

export class HomePageModule { }
