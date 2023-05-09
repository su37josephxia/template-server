import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()

        const code = exception.getStatus ? exception.getStatus() : 500

        const msg = exception.message ? exception.message :
            'Internal Server Error'

        // 正常应答
        response.status(200).json({
            code,
            msg
        })
    }
}