import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';
import { ReplyPage } from '../reply/reply';
import { LikesPage } from '../likes/likes';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  	constructor(public navCtrl: NavController) {}

  	viewReplies() {
    	this.navCtrl.push(ReplyPage, {"Sdsd":"Sdsd"});
	}

	viewLikes() {
    	this.navCtrl.push(LikesPage, {"Sdsd":"Sdsd"});
	}


}
