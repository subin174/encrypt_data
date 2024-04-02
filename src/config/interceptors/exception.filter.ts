import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const msg = exception.getResponse()['message']
      ? exception.getResponse()['message']
      : exception.message;

    response.json({
      status: 'ERROR',
      message: msg,
    });
  }
}

@Catch()
export class DefaultExceptionFilter implements ExceptionFilter {
  constructor() {}
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.json({
      status: 'ERROR',
      message: exception.message,
    });
  }
}
