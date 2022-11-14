import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {FormsModule} from '@angular/forms';
import { ListPremiereComponent } from './list-premiere/list-premiere.component';


@NgModule({
  declarations: [ListMovieComponent, ListPremiereComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    FormsModule
  ]
})
export class MovieModule { }
