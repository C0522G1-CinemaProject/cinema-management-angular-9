import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DecentralizationModule} from './component/decentralization/decentralization.module';
import {EmployeeModule} from './component/employee/employee.module';
import {HomeModule} from './component/home/home.module';
import {MovieModule} from './component/movie/movie.module';
import {PromotionModule} from './component/promotion/promotion.module';
import {RegisterModule} from './component/register/register.module';
import {RoomModule} from './component/room/room.module';
import {TicketModule} from './component/ticket/ticket.module';
import {FormsModule} from '@angular/forms';
import {FacebookLoginProvider, GoogleLoginProvider, SocialLoginModule} from '@abacritt/angularx-social-login';
import {SocialAuthServiceConfig} from '@abacritt/angularx-social-login/socialauth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DecentralizationModule,
    EmployeeModule,
    HomeModule,
    MovieModule,
    PromotionModule,
    RegisterModule,
    RoomModule,
    TicketModule,
    FormsModule,
    // SocialLoginModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            // id: GoogleLoginProvider.PROVIDER_ID,
            // provider: new GoogleLoginProvider(
            //   '612774287153-uthnsrl25on17doe8413il68ebv9c969.apps.googleusercontent.com'
            // )
          },
          // {
          //   id: FacebookLoginProvider.PROVIDER_ID,
          //   provider: new FacebookLoginProvider('clientId')
          // }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
