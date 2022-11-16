import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovie} from '../model/i-movie';
import {environment} from '../../environments/environment';
import {Page} from '../page';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  URL_API = `${environment.api_url}`;

  constructor(private http: HttpClient) {
  }

  getMovieList(page: number, size: number, name: string): Observable<Page<IMovie>> {
    return this.http.get<Page<IMovie>>(this.URL_API + '/movie/list' + '?name=' + name + '&page=' + (page - 1) + '&size=' + size);
  }

  deleteMovie(id: number): Observable<void> {
    return this.http.delete<void>(this.URL_API + '/movie/delete/' + id);
  }

}
