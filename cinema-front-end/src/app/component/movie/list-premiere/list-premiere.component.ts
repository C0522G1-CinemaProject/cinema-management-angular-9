import { Component, OnInit } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MovieDto} from '../../../dto/movie-dto';
import {MovieService} from '../../../service/movie.service';

@Component({
  selector: 'app-list-premiere',
  templateUrl: './list-premiere.component.html',
  styleUrls: ['./list-premiere.component.css']
})
export class ListPremiereComponent implements OnInit {
  pageSize = 5;
  movieList$: Observable<MovieDto[]> | undefined;
  movieNameSearch = '';
  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.paginatePremiere(this.movieNameSearch, this.pageSize);
  }
  paginatePremiere(movieNameSearch, pageSize) {
    this.movieService.findAllListPremiereSoonMovie(movieNameSearch, pageSize).subscribe(data => {
      this.movieList$ = new BehaviorSubject<MovieDto[]>(data.content);
    });
  }
  nextPage() {
    this.pageSize += 1;
    this.paginatePremiere(this.movieNameSearch, this.pageSize);
  }
}
