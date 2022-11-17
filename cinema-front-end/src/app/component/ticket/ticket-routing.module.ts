import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HistoryPointListComponent} from './history-point-list/history-point-list.component';
import {CanceledTicketListComponent} from './canceled-ticket-list/canceled-ticket-list.component';
import {BookingTicketListComponent} from './booking-ticket-list/booking-ticket-list.component';

const routes: Routes = [
  {path: 'history/booking', component: BookingTicketListComponent},
  {path: 'history/canceled', component: CanceledTicketListComponent},
  {path: 'history/point', component: HistoryPointListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
