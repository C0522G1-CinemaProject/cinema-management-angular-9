import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IPromotion} from '../model/i-promotion';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {
  private apiUrl: string;

  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.api_url;
  }

  showPromotion(nameSearch: string): Observable<IPromotion[]> {
    return this.httpClient.get<IPromotion[]>(this.apiUrl +
      'promotions?name_like=' + nameSearch);
  }

  findPromotionSearchPaging(numberRecord: number, curPage: number, nameSearch: string): Observable<IPromotion[]> {
    return this.httpClient.get<IPromotion[]>(this.apiUrl + 'khs?_page=' + curPage + '&_limit=' + numberRecord +
      '&khName_like=' + nameSearch);
  }
  deletePromotion(id: number): Observable<IPromotion> {
    return this.httpClient.delete<IPromotion>(this.apiUrl + 'khs/' + id);
  }


  createPromotion(promotion): Observable<IPromotion> {
    return this.httpClient.post<IPromotion>(this.apiUrl + 'save', promotion);
  }

  getInfo(id: number): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.apiUrl + id);
  }

  editPromotion(id: number, promotion: IPromotion): Observable<IPromotion> {
    return this.httpClient.get<IPromotion>(this.apiUrl + 'edit/' + id);
  }
}
