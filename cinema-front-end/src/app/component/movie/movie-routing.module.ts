import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {ListPremiereComponent} from './list-premiere/list-premiere.component';

const routes: Routes = [
  {path: 'list/home', component: ListMovieComponent},
  {path: 'list/premiere', component: ListPremiereComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
