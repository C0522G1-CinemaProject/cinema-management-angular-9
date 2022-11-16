import {Component, OnInit} from '@angular/core';
import {MovieService} from '../../../../service/movie.service';
import {IMovie} from '../../../../model/i-movie';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {colors} from '@angular/cli/utilities/color';
import {DomSanitizer, Title} from '@angular/platform-browser';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  id: number;

  movie: IMovie;
  ctrl = new FormControl();

  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }

  constructor(private movieService: MovieService,
              private activatedRoute: ActivatedRoute,
              private domSanitizer: DomSanitizer,
              private  title: Title) {
  }

  transform(url) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnInit(): void {
    this.title.setTitle('Chi tiết phim');
    const id = Number(this.activatedRoute.snapshot.params.id);
    this.movieService.findById(id).subscribe(value => {
      console.log(value);
      this.movie = value;
    });
  }
}
