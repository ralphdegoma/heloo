import { Component } from '@angular/core';
import { NavController,AlertController} from 'ionic-angular';
import { MediaCapture,MediaPlugin, MediaFile, CaptureError, File } from 'ionic-native';
import { RecordPage } from '../record/record';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
 



export class HomePage {

  	constructor(public navCtrl: NavController) {
  	}
  	recorderView() {
    	this.navCtrl.push(RecordPage, {"Sdsd":"Sdsd"});
	}
}
