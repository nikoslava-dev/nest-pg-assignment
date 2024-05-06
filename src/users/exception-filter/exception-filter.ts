import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';

function responseError(response, exception, httpStatus) {
  response.status(httpStatus).json({
    statusCode: httpStatus,
    name: exception?.name ?? null,
    message: `exception filter log:  ${exception?.message}` ?? null,
  });
}

@Catch()
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const exceptionStatus = exception?.['status'];

    Logger.error(`${exception}\n${exception?.['stack'] ?? exception}`);
    return responseError(response, exception, exceptionStatus ?? HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
