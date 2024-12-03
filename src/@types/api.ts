export interface IResponseWithPagination<T> {
  count: number;
  next: string;
  previous: string;
  result: T[];
}
