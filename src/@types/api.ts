export interface IResponseWithPagination<T> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}
