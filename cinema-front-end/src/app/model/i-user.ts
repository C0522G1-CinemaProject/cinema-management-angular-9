import {IUserRole} from './iuser-role';

export interface IUser {
  username: string;
  password: string;

  userRoleList: IUserRole[];
}
