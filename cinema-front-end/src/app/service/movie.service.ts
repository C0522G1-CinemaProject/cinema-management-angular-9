import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IMovie} from '../model/i-movie';

const API_URL = `${environment.api_url}`;

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) {
  }

  findById(id: number): Observable<IMovie> {
    return this.http.get<IMovie>(API_URL + `movie/detail/1`);
  }
}
