import { Component } from '@angular/core';
import { NavController,AlertController,NavParams} from 'ionic-angular';
import { MediaCapture,MediaPlugin,HTTP, MediaFile, CaptureError, File } from 'ionic-native';
import {OnInit, OnDestroy} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import { Transfer } from 'ionic-native';
declare var recorder;
declare var cordova: any;


/*
  Generated class for the Record page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage {
 	private limit: number = 30;
 	private audioTime : number = 0;
 	private percentage: number = 0;
 	private audioDuration: number;
 	private limit_sec: number = 0;
    private media: any;
	private ticker: any;
    public timer: number = 0;
    private recording_status: string;
    public image_record: boolean = true;
    public image_stop: boolean = true;
    public image_play: boolean = true;
    public image_stopPlay: boolean = true;
    private generic_file_name: string = "recording.wav";


  	constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {
	  	this.image_record = false; //display record image
	  	this.recording_status = "";

	}

	ionViewDidLoad() {
	    console.log('ionViewDidLoad RecordPage');
	}

	


	processRecording(){
		if(this.recording_status == ""){
			this.startRecording();
		}
		else if(this.recording_status == "recording"){
			this.stopRecording();
		}else if(this.recording_status == "play"){
			this.stopPlayback();
		}else if(this.recording_status == "stop"){
			this.startPlayback();
		}else if(this.recording_status == "stopPlay"){
			this.startPlayback();
		}
	}
	checkLimit(duration = 0){

		var limit_valid = 0;

		//for playback function
		if(duration != 0){
			limit_valid = duration;
		}else{
			limit_valid = this.limit;
			this.audioTime++;
		}
		this.limit_sec++;
		
		//this.showAlert(duration)

		this.percentage = (this.limit_sec / limit_valid) * 100;
		if(this.limit_sec == limit_valid){
			this.stopRecording();
			clearInterval(this.ticker)
		}else{
			console.log(this.limit_sec)
		}
	}
  	showAlert(message) {
	  let alert = this.alertCtrl.create({
	    title: 'Message',
	    subTitle: message,
	    buttons: ['OK']
	  });
	  alert.present();
	}

	handleRecordImage(image_record = true,image_stop = true,image_play = true){
		this.image_record = image_record;
		this.image_stop = image_stop;
		this.image_play = image_play;
	}


  	startRecording() {
	  	try {
	  		this.media = new MediaPlugin(cordova.file.dataDirectory+this.generic_file_name);
		    this.media.startRecord();
		    this.recording_status = "recording";
		    this.handleRecordImage(true,false,true);
		    this.timeTicker();
	  	}
	  	catch (e) {
		   console.log(e)
		   this.showAlert(e+'Could not start recording.');
	  	}
	} 

	timeTicker(duration = 0){
		this.ticker = setInterval(()=> {
	       this.checkLimit(duration); 
	    },1000);
	}
	resetRecording() {
		this.stopRecording();
		this.media.release();
		this.audioTime = 0;
		this.recording_status = "";
		this.handleRecordImage(false,true,true);
		clearInterval(this.ticker);
	}
	stopRecording() {
		 try {
		    this.media.stopRecord();
		    this.handleRecordImage(true,true,false);
		    this.recording_status = "stop";
		    clearInterval(this.ticker)
		    this.resetCounter();
		  }
		  catch (e) {
		  	this.resetCounter();
		  	alert(e)
		    this.showAlert('Could not stop recording.');
		  }
	}
	resetCounter(){
		this.limit_sec = 0;
		this.percentage = 0;
		clearInterval(this.ticker)
	}
	startPlayback() {
	  try {
	    this.media.play();
	    this.media.setVolume(1.0)
	    this.handleRecordImage(true,false,true);
	    this.recording_status = "play";
	    this.audioDuration = this.audioTime;
	    this.timeTicker(this.audioDuration);
	  }
	  catch (e) {
	    this.showAlert('Could not play recording.');
	  }
	}

	stopPlayback() {
	  try {
	    this.media.stop();
	    this.handleRecordImage(true,true,false);
	    this.recording_status = "stopPlay";
	    this.resetCounter();
	  }
	  catch (e) {
	    this.showAlert('Could not stop playing recording.');
	  }
	}




	sendRecordedMessage() {
		const fs:string = cordova.file.dataDirectory;
		File.checkDir(fs, this.generic_file_name).then(_ => alert('yes')).catch(err => alert('boooh'));
		alert(fs+this.generic_file_name)
		const fileTransfer = new Transfer();
		var options: any;

		options = {
		 fileKey: 'file',
		 fileName: 'name.wav',
		 headers: {}
		}
		fileTransfer.upload(cordova.file.dataDirectory+this.generic_file_name, "http://192.168.43.46:81/test", options)
		.then((data) => {

			alert(JSON.stringify(data));
		 // success
		}, (err) => {
		 // error
		 alert(JSON.stringify(err));
		})


	}

	
}
