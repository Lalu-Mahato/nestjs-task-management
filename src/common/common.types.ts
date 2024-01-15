export type ApiResponse<T> = {
  statusCode: number;
  status: string;
  data: T;
};
