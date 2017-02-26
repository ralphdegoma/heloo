import { Component } from '@angular/core';
import { NavController,AlertController,NavParams} from 'ionic-angular';
import { MediaCapture,MediaPlugin,HTTP, Facebook, MediaFile, CaptureError, File } from 'ionic-native';
import {OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { HomePage } from '../home/home';
import { NativeStorage } from 'ionic-native';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {


 	private full_name:	string ;
 	private authData:	any;
	constructor(public facebookAuth: FacebookAuth, public user: User, private navCtrl:NavController) {
			
		NativeStorage.getItem('fb_auth')
		  .then(
		    data => this.authenticate(data),
		    error => console.error(error)
		  );

	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	logIn (){
		
		Facebook.login(['email']).then( (response) => {
			this.authData = {data: response, status: true}
			NativeStorage.setItem('fb_auth', this.authData)
			.then(
			()	      => this.authenticate(this.authData),
				error => alert('Error storing item'+ error)
			);

		}).catch((error) => { alert(error) });

	}

	authenticate(authData){

		if(authData.status == true){
			this.navCtrl.push(HomePage, authData)
		}else{
			alert("not auhtenticated")
			alert(JSON.stringify(authData))
		}
		

	}

}
