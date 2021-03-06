import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RecordPage } from '../pages/record/record';
import { RoundProgressModule } from 'angular-svg-round-progressbar';
import { LoginPage } from '../pages/login/login';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { FormsModule } from '@angular/forms';
import { ProfilePage } from '../pages/profile/profile';
import { ConvoPage } from '../pages/convo/convo';
import { IonicAudioModule } from 'ionic-audio';


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'c2844777'
  },
  'auth': {
    'facebook': {
      'scope': ['public_profile', 'email']
    }
  }
};



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RecordPage,
    LoginPage,
    ProfilePage,
    ConvoPage
    

  ],
  imports: [
    IonicModule.forRoot(MyApp),
    RoundProgressModule,
    FormsModule,
    CloudModule.forRoot(cloudSettings),
    IonicAudioModule.forRoot()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RecordPage,
    LoginPage,
    ProfilePage,
    ConvoPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})





export class AppModule {}
