import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, originalUrl, headers, body } = req;

    console.log(`${method} ${originalUrl}`);
    console.log('Platform:', headers['platform']);
    console.log('Authorization:', headers['authorization']);

    if (Object.keys(body || {}).length) {
      console.log('Body:', JSON.stringify(body));
    }

    const started = Date.now();
    return next.handle().pipe(
      tap(() => {
        console.log(`Completed in ${Date.now() - started}ms\n`);
      }),
    );
  }
}
