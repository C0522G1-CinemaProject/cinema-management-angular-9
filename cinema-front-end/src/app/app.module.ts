import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
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
import {CustomerListComponent} from './component/customer/customer-list/customer-list.component';
import {CustomerEditComponent} from './component/customer/customer-edit/customer-edit.component';
import {CommonModule} from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
    CommonModule,
    NgbModule,
    FormsModule

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
