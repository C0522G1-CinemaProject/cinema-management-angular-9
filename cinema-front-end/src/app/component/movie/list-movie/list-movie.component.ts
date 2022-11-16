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
  total$: Observable<number>;
  movieNameSearch = '';
  action: boolean;

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.paginate(this.movieNameSearch, this.pageSize);
  }

  paginate(movieNameSearch, pageSize) {
    this.movieService.findAllListMovie(movieNameSearch, pageSize).subscribe(data => {
      console.log(data);
      if (data != null) {
        this.action = true;
        this.movieList$ = new BehaviorSubject<MovieDto[]>(data.content);
        this.total$ = new BehaviorSubject<number>(data.totalElements);
      } else {
        this.action = false;
      }
    });
  }

  nextPage() {
    this.pageSize += 1;
    this.paginate(this.movieNameSearch, this.pageSize);
  }
}
