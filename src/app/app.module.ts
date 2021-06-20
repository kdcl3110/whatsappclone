import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from "@angular/fire/storage";
import { environment } from '../environments/environment';
import { AuthService } from "./shared/services/auth.service";
import { Camera } from '@ionic-native/camera/ngx';
import { Ionic4EmojiPickerModule } from 'ionic4-emoji-picker'

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PopoverComponent } from './components/popover/popover.component';
import { LanguePropsComponent } from './components/langue-props/langue-props.component';

export function createTranslateLoader(http: HttpClient){
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent, LanguePropsComponent],
  entryComponents: [],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    Ionic4EmojiPickerModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService,
    Camera
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
