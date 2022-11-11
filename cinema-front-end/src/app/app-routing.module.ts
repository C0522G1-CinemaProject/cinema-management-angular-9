import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeModule} from './component/home/home.module';
import {AuthGuard} from './component/decentralization/auth.guard';
import {EmployeeModule} from './component/employee/employee.module';
import {MovieModule} from './component/movie/movie.module';
import {PromotionModule} from './component/promotion/promotion.module';
import {RegisterModule} from './component/register/register.module';
import {RoomModule} from './component/room/room.module';
import {TicketModule} from './component/ticket/ticket.module';

import {DecentralizationModule} from './component/decentralization/decentralization.module';

/*không được xóa canActivate*/
const routes: Routes = [
  {
    path: 'home', loadChildren: () => HomeModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_Employee', 'ROLE_Admin', 'ROLE_Customer', '']
    }
  },
  {
    path: 'employee', loadChildren: () => EmployeeModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_Employee', 'ROLE_Admin']
    }
  },
  {
    path: 'movie', loadChildren: () => MovieModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_Employee', 'ROLE_Admin', 'ROLE_Customer']
    }
  },
  {
    path: 'promotion', loadChildren: () => PromotionModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard]
  },
  {
    path: 'register', loadChildren: () => RegisterModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard]
  },
  {
    path: 'room', loadChildren: () => RoomModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard]
  },
  {
    path: 'ticket', loadChildren: () => TicketModule,
    /*không được xóa canActivate*/
    // canActivate: [AuthGuard]
  },

  {
    path: 'login', loadChildren: () => DecentralizationModule
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
