export interface SearchResult<T> {
  content: T[];
  pagination: {
    number: number,
    size: number,
    totalPages: number
  };
  totalElements: number;

}
