import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { ReplyPage } from '../pages/reply/reply';
import { LikesPage } from '../pages/likes/likes';
import { NewPostPage } from '../pages/new-post/new-post';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = HomePage;
  pages: Array<{title: string, component: any}>;
  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });


     this.pages = [
      { title: 'Home Page', component: HomePage },
      { title: 'Replies', component: ReplyPage },
      { title: 'Likes', component: LikesPage },      
    ];

  }
}
