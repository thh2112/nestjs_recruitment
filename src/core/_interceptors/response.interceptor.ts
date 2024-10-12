import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../_models/response';

export interface ResponseTemplate<T> {
  message: string;
  result: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data: ResponseTemplate<T>) => ({
        success: true,
        message: data.message,
        statusCode: context.switchToHttp().getResponse<{ statusCode: number }>().statusCode,
        errorMessage: '',
        errorMessageCode: '',
        data: data.result,
      })),
    );
  }
}
