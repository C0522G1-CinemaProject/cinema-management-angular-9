import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {RoomService} from '../../../service/room.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {

  rooms: any;
  searchForm: FormGroup;
  name: string = '';
  idRoom;

  constructor(private roomService: RoomService, private activite: ActivatedRoute) {
    this.activite.paramMap.subscribe((paramMap: ParamMap) => {
      this.idRoom = paramMap.get('id');
    });
    this.searchForm = new FormGroup({
      name: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.getAllRoom();
  }

  getAllRoom() {
    this.roomService.getAllRoom(this.name).subscribe(value => {
      this.rooms = value;
    });
  }

  searchRoom(name: string) {
    this.roomService.getAllRoom(name).subscribe(value => {
      this.rooms = value;
    });
  }

}
