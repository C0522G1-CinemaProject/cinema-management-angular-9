import {RoomDto} from './room-dto';
import {SeatType} from './seat-type';

export interface Seat {
id?:number;
seatType:SeatType,
seatName?:string
}
