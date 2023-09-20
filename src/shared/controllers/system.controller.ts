import { Controller, Get } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { spawn } from 'child_process'

@ApiTags('系统维护')
@Controller('system')
export class SystemController {
    constructor() {

    }

    @ApiOperation({
        summary: '数据库列表'
    })
    @Get('/datebase')
    async list() {
        console.log('list ...')
        // ls 
        const ret = await this.spawn('ls', ['-a'], {})
        console.log('ret', ret)
        return {
            ok: 1,
            ret
        }
    }


    async spawn(cmd, args, opt) {
        return new Promise(resolve => {
            const p = spawn(cmd, args, opt)
            // 数据流的对接
            p.stdout.pipe(process.stdout)
            p.stderr.pipe(process.stderr)
            let ret = ''
            p.stdout.on('data', (data) => {
                ret += data.toString()
            })
            p.on('close', () => {
                resolve(ret)
            })
        })
    }
}