import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map } from 'rxjs'
import { PassThrough } from "stream";

@Injectable()
export class RemoveSensitiveUserInfoInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        // const request = context.switchToHttp().getRequest()
        // console.log('request', request)
        return next.handle().pipe(
            // 统一应答实现
            map(res => {
                // console.log('res', res)

                // password
                // salt 盐
                if (res) {
                    res = JSON.parse(JSON.stringify(res))
                    this.delValue(res, 'password')
                    this.delValue(res, 'salt')
                }

                return {
                    code: 200,
                    result: res
                }
            })
        )
    }

    delValue(data, targetKey) {
        for (let key in data) {
            if (key === targetKey) {
                delete data[key]
            } else if (typeof data[key] === 'object') {
                this.delValue(data[key], targetKey)
            }
        }
    }

}