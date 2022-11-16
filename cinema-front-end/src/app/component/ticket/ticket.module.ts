import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketRoutingModule} from './ticket-routing.module';
import {ConfirmBookingTicketComponent} from './confirm-booking-ticket/confirm-booking-ticket.component';
import {PaymentBookingTicketComponent} from './payment-booking-ticket/payment-booking-ticket.component';



@NgModule({
  declarations: [
    ConfirmBookingTicketComponent,
    PaymentBookingTicketComponent
  ],
  exports: [
    ConfirmBookingTicketComponent,
    PaymentBookingTicketComponent
  ],
  imports: [
    CommonModule,
    TicketRoutingModule
  ]
})
export class TicketModule {
}
