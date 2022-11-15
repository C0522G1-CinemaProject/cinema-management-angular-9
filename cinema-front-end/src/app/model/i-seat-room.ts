import {ISeatType} from './i-seat-type';
import {ISeat} from './i-seat';
import {IRoom} from './i-room';

export interface ISeatRoom {
  id?: number,
  room?: IRoom,
  seat?: ISeat,
  seatType?: ISeatType;
}
