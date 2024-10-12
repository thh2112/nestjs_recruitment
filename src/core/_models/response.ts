export interface Response<T> {
  success: boolean;
  message: string;
  errorMessage: string;
  errorMessageCode: string;
  statusCode: number;
  data?: T;
}
