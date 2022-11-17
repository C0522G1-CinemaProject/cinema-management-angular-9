import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TicketManagementListComponent} from './ticket-management/ticket-management-list/ticket-management-list.component';
import {TicketManagementDeleteComponent} from './ticket-management/ticket-management-delete/ticket-management-delete.component';
import {PaymentBookingTicketComponent} from './payment-booking-ticket/payment-booking-ticket.component';
import {ConfirmBookingTicketComponent} from './confirm-booking-ticket/confirm-booking-ticket.component';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';
import {BookingSeatComponent} from './booking-seat/booking-seat.component';

const routes: Routes = [
  {path: 'booking-ticket', component: BookingTicketComponent},
  {path: 'booking-seat', component: BookingSeatComponent},
  {path: 'payment-ticket', component: PaymentBookingTicketComponent},
  {path: 'confirm-ticket', component: ConfirmBookingTicketComponent},
  {path: 'list-management', component: TicketManagementListComponent},
  {path: 'delete-management', component: TicketManagementDeleteComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
