import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketRoutingModule } from './ticket-routing.module';
import { BookingSeatComponent } from './booking-seat/booking-seat.component';
import { BookingTicketComponent } from './booking-ticket/booking-ticket.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [BookingSeatComponent, BookingTicketComponent],
    imports: [
        CommonModule,
        TicketRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class TicketModule { }
