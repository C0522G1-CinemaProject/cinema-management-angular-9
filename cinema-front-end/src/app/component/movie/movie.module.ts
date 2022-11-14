import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MovieRoutingModule} from './movie-routing.module';
import {MovieListComponent} from './movie-list/movie-list.component';
import {FormsModule} from '@angular/forms';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [MovieListComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule,
    NgbPaginationModule
  ]
})
export class MovieModule {
}
