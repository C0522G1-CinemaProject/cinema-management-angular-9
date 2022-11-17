import {IMovie} from './i-movie';

export interface ICommentMovie {
  id?: number;
  movie?: IMovie;
  timeComment?: string;
  pointComment?: number;
  contentComment?: string;
}
