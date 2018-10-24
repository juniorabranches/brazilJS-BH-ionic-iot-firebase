import { Injectable } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Injectable()
export class FireService {

  private urlBase = "https://ionic-iot-18a78.firebaseio.com/";

  constructor(public http: Http, public jsonp: Jsonp) { }

}
