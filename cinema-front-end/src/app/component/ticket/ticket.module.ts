
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketManagementListComponent } from './ticket-management/ticket-management-list/ticket-management-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TicketManagementDeleteComponent } from './ticket-management/ticket-management-delete/ticket-management-delete.component';
import {BookingSeatComponent} from './booking-seat/booking-seat.component';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';
import {ConfirmBookingTicketComponent} from './confirm-booking-ticket/confirm-booking-ticket.component';
import {PaymentBookingTicketComponent} from './payment-booking-ticket/payment-booking-ticket.component';



@NgModule({
  declarations: [TicketManagementListComponent,
    TicketManagementDeleteComponent,
    BookingSeatComponent,
    BookingTicketComponent,
    ConfirmBookingTicketComponent,
    PaymentBookingTicketComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    NgbPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TicketModule {
}
