import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovieType} from '../model/i-movie-type';
import {IMovieDto} from '../dto/i-movie-dto';
import {IMovie} from '../model/i-movie';

const API_URL = `${environment.movieUrl}`;
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getAllMovieType(): Observable<IMovieType[]> {
    console.log(API_URL + '/movieType');
    return this.http.get<IMovieType[]>(API_URL + '/movieType');
  }

  saveMovie(movie: IMovie): Observable<IMovie> {
    console.log(API_URL + '/add', movie);
    return this.http.post<IMovie>(API_URL + '/add', movie);
  }

  editMovie(movie: IMovie): Observable<IMovie> {
    console.log(API_URL + '/edit/' + movie.id, movie);
    return this.http.patch<IMovie>(API_URL + '/edit/' + movie.id, movie);
  }

  getMovieById(id: number): Observable<IMovieDto> {
    console.log(API_URL + '/' + id);
    return this.http.get<IMovieDto>(API_URL + '/' + id);
  }
}
