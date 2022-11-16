import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IPromotion} from '../model/i-promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private API_URL = 'http://localhost:8080/api/promotion/';
  constructor(private httpClient: HttpClient) {}
  createPromotion(promotion): Observable<IPromotion> {
    return this.httpClient.post<IPromotion>(this.API_URL + 'save', promotion);
  }

  getInfo(id: number): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.API_URL + 'detail/' + id);
  }

  editPromotion(id: number, promotion): Observable<IPromotion> {
    return this.httpClient.patch<IPromotion>(this.API_URL + 'edit/' + id, promotion);
  }
}
