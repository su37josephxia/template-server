import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Session, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
// import { AuthService } from "../services/auth.service";
import { LoginDTO, RegisterDTO } from '../dtos/auth.dto';
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "../services/auth.service";

@ApiTags('认证鉴权')
@Controller('api')
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }


    @ApiOperation({
        summary: '注册',
    })
    @HttpCode(200)
    @Post('register')
    async register(
        @Body() registerDTO: RegisterDTO
    ): Promise<any> {
        return this.authService.registerByName(registerDTO)
    }


    @ApiOperation({
        summary: '用户登录',
    })
    @HttpCode(200)
    @Post('login')
    async login(
        @Body() loginDTO: LoginDTO
    ): Promise<any> {
        // const user = await this.authService.login(loginDTO)
        // return user
    }

    @ApiOperation({
        summary: '用户登出',
    })
    @ApiResponse({
        status: HttpStatus.OK
    })
    @HttpCode(200)
    @Post('logout')
    async logout(
    ): Promise<any> {
        return
    }

    @ApiOperation({
        summary: '用户当前信息',
    })
    @ApiBearerAuth()
    @Get('info')
    @UseGuards(AuthGuard('jwt'))
    async info(@Req() req: any): Promise<any> {
        // const data = await this.authService.info(req.user.id)
        // return { data }
    }
}