export interface PageResult<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
}
