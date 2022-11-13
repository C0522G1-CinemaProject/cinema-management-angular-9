export interface SearchResult<T> {
  content: T[];
  pagination: {
    pageNumber: number,
    size: number,
    totalPages: number
  };
  totalElements: number;

}
