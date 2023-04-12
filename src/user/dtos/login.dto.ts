import { IsNotEmpty, Matches } from "class-validator"
import { regMobileCN } from "@/shared/utils/regex.util";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {

    /**
     * 
     */
    @IsNotEmpty({ message: '请输入用户名' })
    @ApiProperty({ example: 'admin' })
    readonly name: string;

    /**
     * 用户密码
     */
    @IsNotEmpty({ message: '请输入密码' })
    @ApiProperty({ example: 'admin' })
    readonly password: string;
}