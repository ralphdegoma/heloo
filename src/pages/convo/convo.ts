import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AudioProvider } from 'ionic-audio';
import { RecordPage } from '../record/record';

/*
  Generated class for the Convo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-convo',
  templateUrl: 'convo.html'
})
export class ConvoPage {
  
  allTracks: any[];
  selectedTrack:any;
  myTracks: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private _audioProvider: AudioProvider) {

  	this.myTracks = [{
      src: 'https://archive.org/download/JM2013-10-05.flac16/V0/jm2013-10-05-t12-MP3-V0.mp3',
      artist: 'John Mayer',
      title: 'Why Georgia',
      art: 'img/johnmayer.jpg',
      preload: 'metadata' // tell the plugin to preload metadata such as duration for this track, set to 'none' to turn off
    }]




  }

   	ngAfterContentInit() {     
		// get all tracks managed by AudioProvider so we can control playback via the API
		this.allTracks = this._audioProvider.tracks; 
	}

	playSelectedTrack() {
		// use AudioProvider to control selected track 
		this._audioProvider.play(this.selectedTrack);
	}

	pauseSelectedTrack() {
	 	// use AudioProvider to control selected track 
	 	this._audioProvider.pause(this.selectedTrack);
	}
	     
	onTrackFinished(track: any) {
		console.log('Track finished', track)
	} 

	recorderView() {
    	this.navCtrl.push(RecordPage, {"Sdsd":"Sdsd"});
	}


  ionViewDidLoad() {
    	console.log('ionViewDidLoad ConvoPage');
  }

}
