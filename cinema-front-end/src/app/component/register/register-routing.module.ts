import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {EditCustomerUserComponent} from './edit-customer-user/edit-customer-user.component';

const routes: Routes = [
  {path: 'signup', component: CreateCustomerComponent},
  {
    path: 'edit', component: EditCustomerUserComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {
}
