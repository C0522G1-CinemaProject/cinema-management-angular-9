
const API_URL = `${environment.movieUrl}`;
import {Injectable} from '@angular/core';
import {IMovieType} from '../model/i-movie-type';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {PageResult} from '../model/page-result';
import {MovieDto} from '../dto/movie-dto';
import {TokenStorageService} from './token-storage.service';
import {IMovie} from '../model/i-movie';
import {Page} from '../page';


@Injectable({
  providedIn: 'root'
})
export class MovieService {

   apiUrlListMovie = environment.api_url_list_movie;
   URL_API = `${environment.api_url}`;
  httpOptions: any;
  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.tokenService.getToken()
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  
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
  
 findById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(API_URL + `movie/detail/1`);
  }
  findAllListMovie(name: string, size: number): Observable<PageResult<MovieDto>> {
    const API_URL = this.apiUrlListMovie + 'list' + '/home' + '?name=' + name  + '&size=' + size;
    console.log(API_URL);
    return this.httpClient.get<PageResult<MovieDto>>(API_URL);
  }

  findAllListPremiereSoonMovie(name: string, size: number): Observable<PageResult<MovieDto>> {
    const API_URL_PREMIERE = this.apiUrlListMovie + 'list' + '/premiere' + '?name=' + name + '&size=' + size;
    console.log(API_URL_PREMIERE);
    return this.httpClient.get<PageResult<MovieDto>>(API_URL_PREMIERE);
  }

  getMovieList(page: number, size: number, name: string): Observable<Page<IMovie>> {
    return this.http.get<Page<IMovie>>(this.URL_API + '/movie/list' + '?name=' + name + '&page=' + (page - 1) + '&size=' + size);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(this.URL_API + '/movie/delete/' + id);
  }


}
