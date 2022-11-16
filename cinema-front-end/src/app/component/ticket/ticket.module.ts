import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TicketRoutingModule} from './ticket-routing.module';
import {HistoryPointListComponent} from './history-point-list/history-point-list.component';
import {CanceledTicketListComponent} from './canceled-ticket-list/canceled-ticket-list.component';
import {BookingTicketListComponent} from './booking-ticket-list/booking-ticket-list.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [HistoryPointListComponent, CanceledTicketListComponent, BookingTicketListComponent],
  imports: [
    CommonModule,
    TicketRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule
  ]
})
export class TicketModule {
}
