import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class GetAllInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('inside get all interceptor -> request');

    return next
      .handle()
      .pipe(
        tap(() => console.log('inside get all interceptor -> response')),
      );
  }
}