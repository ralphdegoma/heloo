import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReplyPage } from '../pages/reply/reply';
import { HomePage } from '../pages/home/home';
import { LikesPage } from '../pages/likes/likes';
import { NewPostPage } from '../pages/new-post/new-post';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReplyPage,
    LikesPage,
    NewPostPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReplyPage,
    LikesPage,
    NewPostPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
