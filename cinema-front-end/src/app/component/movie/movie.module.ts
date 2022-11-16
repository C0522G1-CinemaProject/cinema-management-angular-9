import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieDetailComponent } from './movie/movie-detail/movie-detail.component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgbRatingModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    declarations: [MovieDetailComponent],
    exports: [
        MovieDetailComponent
    ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    ReactiveFormsModule,
    NgbRatingModule
  ]
})
export class MovieModule { }
