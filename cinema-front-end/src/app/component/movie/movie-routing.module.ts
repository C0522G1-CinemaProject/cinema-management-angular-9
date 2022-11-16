import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieDetailComponent} from './movie/movie-detail/movie-detail.component';

import {ListMovieComponent} from './list-movie/list-movie.component';
import {ListPremiereComponent} from './list-premiere/list-premiere.component';
import {MovieListComponent} from './movie-list/movie-list.component';

const routes: Routes = [
  {path: 'list/home', component: ListMovieComponent},
  {path: 'list/premiere', component: ListPremiereComponent},
  {path : 'list', component: MovieListComponent}
   {path: 'detail/:id', component: MovieDetailComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule {
}
