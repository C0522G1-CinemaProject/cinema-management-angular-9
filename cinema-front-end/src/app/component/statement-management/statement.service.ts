import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
// @ts-ignore
import {Observable} from "rxjs/dist/types";
import {IMovieStatementDto} from "../../dto/i-movie-statement-dto";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatementService {

  constructor(private httpClient: HttpClient) { }

  listMovieTop( numberMonth: number): Observable<Array<IMovieStatementDto>> {

    const URL = environment.api_url + '/api/movie/statement?numberMonth=' + (numberMonth) ;
    return this.httpClient.get<Array<IMovieStatementDto>>(URL);
  }

  listCustomerTop( numberMonth: number): Observable<Array<IMovieStatementDto>> {
    const URL = environment.api_url + '/api/customer/statement?numberMonth=' + (numberMonth) ;
    return this.httpClient.get<Array<IMovieStatementDto>>(URL);
  }
}
