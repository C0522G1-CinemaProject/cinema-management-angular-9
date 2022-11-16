import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';

const routes: Routes = [
  {
    path: 'movie/add',
    component: AddMovieComponent
  },
  {
    path: 'movie/edit/:id',
    component: EditMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieRoutingModule { }
