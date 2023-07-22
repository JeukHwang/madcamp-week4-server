import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { Catch, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { Request, Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger('Exception');

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || ''; // from header
    const response = ctx.getResponse<Response>();
    const { statusCode } = response;
    const contentLength = response.get('content-length');

    this.logger.log(
      `${exception.name}, ${exception.message}, ${exception.cause} | ${method} ${originalUrl} ${statusCode} | ${contentLength} ${userAgent} ${ip}`,
    );
    this.logger.log(exception.stack);

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    httpAdapter.reply(ctx.getResponse(), exception['response'], httpStatus);
  }
}
