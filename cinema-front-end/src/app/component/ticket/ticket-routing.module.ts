import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BookingTicketComponent} from './booking-ticket/booking-ticket.component';
import {BookingSeatComponent} from './booking-seat/booking-seat.component';
import {AuthGuard} from '../decentralization/auth.guard';


const routes: Routes = [
  {
    path: 'booking-ticket', component: BookingTicketComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CUSTOMER']
    }},
  {
    path: 'booking-seat', component: BookingSeatComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE', 'ROLE_CUSTOMER']
    }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule {
}
