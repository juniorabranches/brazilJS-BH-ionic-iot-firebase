import { Component, ViewChild } from '@angular/core';
import { AlertController, App, LoadingController, IonicPage } from 'ionic-angular';
import {FireService} from '../../providers/fire-data'

import firebase from 'firebase';
import { Chart } from 'chart.js'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  db = firebase.database();

  umidRef = this.db.ref('humidity');
  tempRef = this.db.ref('temperature');

  constructor(
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public app: App, public fire: FireService
  ) { 
      var lampRef = this.db.ref('lamp');
      var currentLampValue = false;
      this.umidRef.on('value', this.onNewData('currentUmid', 'umidLineChart' , 'Umidade', '%'));
      this.tempRef.on('value', this.onNewData('currentTemp', 'tempLineChart' , 'Temperatura', 'C°'));
      lampRef.on('value', function(snapshot){
        var value = snapshot.val();
        var el = document.getElementById('currentLamp')
        if(value){
          el.classList.add('amber-text');
        }else{
          el.classList.remove('amber-text');
        }
        currentLampValue = !!value;
      }); 
      
      setTimeout(() => {
        var btnLamp = document.getElementById('btn-lamp');
        btnLamp.addEventListener('click', function(evt){
          lampRef.set(!currentLampValue);
        }); 
      }, 3000)
  }
 

  onNewData(currentValueEl, chartEl, label, metric){
    return function(snapshot){
      var readings = snapshot.val();
      if(readings){
          var currentValue;
          var data = [];
          for(var key in readings){
            currentValue = readings[key]
            data.push(currentValue);
          }
  
          document.getElementById(currentValueEl).innerText = currentValue + ' ' + metric;
          var elNode = document.getElementById(chartEl);
          new Chart(elNode, {
            type: 'line',
            data: {
                labels: new Array(data.length).fill(""),
                datasets: [{
                    label: label,
                    data: data,
                    borderWidth: 1,
                    fill: false,
                    spanGaps: false,
                    lineTension: 0.1,
                    backgroundColor: "#ffee00",
                    borderColor: "#ffee00"
                }]
            }
          });          
      }
    }
  }

  buildLineChart(el, label, data){
    var elNode = document.getElementById(el);
    new Chart(elNode, {
      type: 'line',
      data: {
          labels: new Array(data.length).fill(""),
          datasets: [{
              label: label,
              data: data,
              borderWidth: 1,
              fill: false,
              spanGaps: false,
              lineTension: 0.1,
              backgroundColor: "#F9A825",
              borderColor: "#F9A825"
          }]
      }
    });
  }  

}
