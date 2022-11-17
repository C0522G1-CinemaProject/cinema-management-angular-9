import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SidebarComponent} from './sidebar/sidebar.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: 'sidebar', component: SidebarComponent
  },
  {
    path: 'homepage', component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule {
}
