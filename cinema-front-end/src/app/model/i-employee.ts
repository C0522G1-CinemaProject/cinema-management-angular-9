import {IUser} from './i-user';

export interface IEmployee {
  id?: number;
  name?: string;
  gender?: number;
  email?: string;
  address?: string;
  phoneNumber?: string;
  username?: IUser;
  idCard?: string;
  dayOfBirth?: string;
  image?: string;
}
