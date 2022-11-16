import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';


import { MovieRoutingModule } from './movie-routing.module';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {FormsModule} from '@angular/forms';
import { ListPremiereComponent } from './list-premiere/list-premiere.component';



import {MovieListComponent} from './movie-list/movie-list.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MovieListComponent,ListMovieComponent, ListPremiereComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    NgbPaginationModule

  ]
})
export class MovieModule {
}
