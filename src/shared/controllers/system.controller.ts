import { Body, Controller, Get, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { spawn } from 'child_process'
import * as moment from "moment";
import { BackupDto } from "../dtos/backup.dto";

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
        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'ls', '/dump'], { cwd: './' })
        console.log(ret)
        const data = ("" + ret).split('\n')
        data.pop()
        return {
            ok: 1,
            data
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


    @ApiOperation({
        summary: '数据库备份',
    })
    @Post('/database/dump')
    async dump(@Body() data) {
        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'mongodump', '--db', 'nest-server', '--out', '/dump/' + moment().format('YYYYMMDDhhmmss')], { cwd: './' })
        return {
            ok: 1
        }
    }

    @ApiOperation({
        summary: '数据库恢复',
    })
    @Post('/database/restore')
    async restore(@Body() dto: BackupDto) {
        console.log('恢复数据', dto.file)
        const ret = await this.spawn('docker-compose', ['exec', '-T', 'mongo', 'mongorestore', '--db', 'nest-server', `/dump/${dto.file}/nest-server`], { cwd: './' })

        return {
            ok: 1
        }
    }
}