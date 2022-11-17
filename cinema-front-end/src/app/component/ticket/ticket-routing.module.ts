import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TicketManagementListComponent} from './ticket-management/ticket-management-list/ticket-management-list.component';
import {TicketManagementDeleteComponent} from './ticket-management/ticket-management-delete/ticket-management-delete.component';

const routes: Routes = [
  {path: 'list-management', component: TicketManagementListComponent},
  {path: 'delete-management', component: TicketManagementDeleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TicketRoutingModule { }
