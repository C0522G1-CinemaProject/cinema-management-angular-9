import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketRoutingModule } from './ticket-routing.module';
import { TicketManagementListComponent } from './ticket-management/ticket-management-list/ticket-management-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule} from '@angular/forms';
import { TicketManagementDeleteComponent } from './ticket-management/ticket-management-delete/ticket-management-delete.component';



@NgModule({
  declarations: [TicketManagementListComponent, TicketManagementDeleteComponent],
    imports: [
        CommonModule,
        TicketRoutingModule,
        NgbPaginationModule,
        FormsModule,
    ]
})
export class TicketModule { }
