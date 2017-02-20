import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ReplyPage } from '../pages/reply/reply';
import { HomePage } from '../pages/home/home';
import { LikesPage } from '../pages/likes/likes';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ReplyPage,
    LikesPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ReplyPage,
    LikesPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
