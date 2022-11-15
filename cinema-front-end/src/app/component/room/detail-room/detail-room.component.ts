import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {RoomService} from '../../../service/room.service';
import {Seat} from '../../../dto/seat';
import {SeatDto} from '../../../dto/seat-dto';

@Component({
  selector: 'app-detail-room',
  templateUrl: './detail-room.component.html',
  styleUrls: ['./detail-room.component.css']
})
export class DetailRoomComponent implements OnInit {
  idRoom;
  seatList: Seat[] = [];
  seatList1: SeatDto[] = [];

  constructor(private activatedRoute:ActivatedRoute, private roomService:RoomService) {
    this.activatedRoute.paramMap.subscribe(paraMap=> {
      this.idRoom = paraMap.get("id")
    })
  }

  getListSeat(){
    this.roomService.findSeatRoomByRoomId(this.idRoom).subscribe(data=>{
      this.seatList = data;
      this.seatList1 = data;
      console.log(this.seatList);
    })
  }

  ngOnInit(): void {
    this.getListSeat()
  }

  updateSeatType(id: number, seatTypeId: number) {
    this.roomService.updateSeatType(id,seatTypeId).subscribe(()=>{
      this.getListSeat();
    })
  }

}
