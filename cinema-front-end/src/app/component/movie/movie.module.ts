import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import { MovieRoutingModule } from './movie-routing.module';

import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {FormsModule} from '@angular/forms';
import { ListPremiereComponent } from './list-premiere/list-premiere.component';
import {MovieListComponent} from './movie-list/movie-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MovieListComponent,ListMovieComponent, ListPremiereComponent,MovieDetailComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    NgbPaginationModule,
    ReactiveFormsModule,
    NgbRatingModule


  ]
})
export class MovieModule {
}
