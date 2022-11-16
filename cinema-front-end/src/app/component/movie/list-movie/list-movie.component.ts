import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {MovieDto} from '../../../dto/movie-dto';
import {MovieService} from '../../../service/movie.service';
import {PageResult} from '../../../model/page-result';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {
  pageSize = 5;
  // moviePage$: Observable<PageResult<MovieDto>>;
  movieList$: Observable<MovieDto[]> | undefined;
  movieNameSearch = '';

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.paginate(this.movieNameSearch, this.pageSize);
  }

  paginate(movieNameSearch, pageSize) {
    this.movieService.findAllListMovie(movieNameSearch, pageSize).subscribe(data => {
      // this.moviePage$ = new BehaviorSubject<PageResult<MovieDto>>(data);
      this.movieList$ = new BehaviorSubject<MovieDto[]>(data.content);
    });
  }

  nextPage() {
    this.pageSize += 1;
    this.paginate(this.movieNameSearch, this.pageSize);
  }
}
