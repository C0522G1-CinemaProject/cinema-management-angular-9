import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookingTicketComponent} from "./booking-ticket/booking-ticket.component";
import {BookingSeatComponent} from "./booking-seat/booking-seat.component";

const routes: Routes = [
  {path: 'booking-ticket', component: BookingTicketComponent},
  {path: 'booking-seat', component: BookingSeatComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
