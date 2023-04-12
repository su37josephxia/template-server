import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()

export class AllExceptionsFilter implements ExceptionFilter {

    catch(exception: any, host: ArgumentsHost) {

        const ctx = host.switchToHttp();

        const response = ctx.getResponse<Response>();

        const status = exception.getStatus ? exception.getStatus() : 500;

        const msg = exception.message
            ? exception.message
            : 'Internal server error';
        response.status(200).json({
            code: status,
            msg
        });

    }

}