import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketRoutingModule} from './ticket-routing.module';
import {ConfirmBookingTicketComponent} from './confirm-booking-ticket/confirm-booking-ticket.component';
import {PaymentBookingTicketComponent} from './payment-booking-ticket/payment-booking-ticket.component';

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
export class TicketModule {
}
