import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';


@NgModule({
  declarations: [
    AddMovieComponent,
    EditMovieComponent
  ],
    imports: [
        CommonModule,
        MovieRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class MovieModule { }
