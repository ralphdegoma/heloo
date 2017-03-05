import { Component ,Input} from '@angular/core';
import { NavController,AlertController,NavParams,LoadingController} from 'ionic-angular';
import { MediaCapture,MediaPlugin,HTTP, Facebook, MediaFile, CaptureError, File } from 'ionic-native';
import {OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { FacebookAuth, User } from '@ionic/cloud-angular';
import { ProfilePage } from '../profile/profile';
import { FormsModule }   from '@angular/forms';
import { NativeStorage } from 'ionic-native';
/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/


class LoginData {
  username: string;
  password: string;
}

@Component({

  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {

	LoginData = new LoginData();
 	private authData:	any;
 	private loading:	any;
 	private errorMessage: string = "";
	constructor(private alertCtrl: AlertController,public facebookAuth: FacebookAuth, public user: User, private navCtrl:NavController,public loadingCtrl: LoadingController) {
			
		this.checkIfLogin();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}

	logIn (){
		this.loadLoader();
		this.verifyData();	
	}

	loadLoader(){
		this.loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		this.loading.present();
	}

	verifyData() {

		HTTP.post('http://192.168.43.46:81/api/heloo/login', this.LoginData, {})
		  .then(data => {

		    this.loading.dismiss();
		    var response = JSON.parse(data.data);

		    if(response.status == false){
		    	this.errorMessage = response.message;
		    	setTimeout(()=> {
		    		this.errorMessage = "";
				},4000);
		    }else if(response.status == true){
		    	this.authenticate(response);
		    }
		  })
		  .catch(error => {

		    this.loading.dismiss();

		});

	}


	checkIfLogin(){

		let authData:any = NativeStorage.getItem('auth')
		  .then(
		    data => this.loginPass(data),
		    error => alert(error)
		  );
		  
		
	}

	loginPass(authData){
		if(authData){
			if(authData.connected == true){
				//this.navCtrl.push(ProfilePage,authData);
				this.navCtrl.setRoot(ProfilePage,authData);
			}
		}
	}


	authenticate(authData = ""){

		NativeStorage.setItem('auth', {connected: true})
		  .then(
		    () => this.navCtrl.push(ProfilePage, authData),
		    error => alert('Error storing item' + error)
		  );

	}

}
