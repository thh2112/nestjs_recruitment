import { ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as moment from 'moment-timezone';
import { Request, Response } from 'express';
import { parseErrorStack } from '../_utils';
import { DATE_TIME_FORMAT } from '@/constants/_consts';

export class AllExceptionsFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);
  protected readonly configService?: ConfigService;

  constructor(configService?: ConfigService) {
    this.configService = configService;
  }

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const status = exception?.getStatus ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const msgErr = exception?.message ? exception.message : 'Internal server error';
    const msgErrorCode = exception?.errorMessageCode
      ? exception.errorMessageCode
      : 'INTERNAL_SERVER_ERROR';

    let detail: any = {
      path: request.url,
      timestamp: moment().format(DATE_TIME_FORMAT),
    };

    if (exception && exception.getResponse) {
      const { message, statusCode, ...args } = exception.getResponse();
      if (args && Object.keys(args).length > 0) {
        detail = { ...detail, ...args };
      }

      if (Array.isArray(message) && message.length > 0) {
        detail = { ...detail, message };
      }
    }

    const stack = parseErrorStack(exception && exception.stack ? exception.stack : undefined);
    this.logger.error(msgErr, {
      ...detail,
      stack,
    });

    response.status(status).json({
      success: false,
      statusCode: status,
      message: '',
      errorMessage: msgErr,
      errorMessageCode: msgErrorCode,
      data: null,
    });
  }
}
