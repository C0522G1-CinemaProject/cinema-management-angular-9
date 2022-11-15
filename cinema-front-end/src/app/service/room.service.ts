import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private URL_ROOM = 'http://localhost:8080/api/admin/roomRest';

  constructor(private http: HttpClient) {
  }

  getAllRoom(name: string): Observable<any> {
    return this.http.get<any>(this.URL_ROOM + '?name=' + name);
  }

  findSeatRoomByRoomId(id: number): Observable<any> {
    return this.http.get(`http://localhost:8080/api/admin/roomRest/seat-room/` + id);
  }

  updateSeatType(id, idSeatType) {
    return this.http.patch(`http://localhost:8080/api/admin/roomRest/updateStatusSeatRoom/${id}/${idSeatType}`, '');
  }

}
