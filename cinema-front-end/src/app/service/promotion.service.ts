import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {IPromotion} from '../model/i-promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private API_BACKEND = 'http://localhost:8080/api/promotion';

  constructor(private httpClient: HttpClient) { }

  getAllPromotion(page: number): Observable<IPromotion[]> {
    return this.httpClient.get<IPromotion[]>(this.API_BACKEND + '/list?page=' + page);
  }

  getPromotionById(id: number): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.API_BACKEND + '/' + id);
  }
}
