// import { SuccessVO } from "@/shared/dtos/success.dto";
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Matches, IsString } from 'class-validator';


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

    sessionId?: string
}

export class RegisterSMSDTO {

    /**
     * 手机号（系统唯一）
     */
    // @Matches(regMobileCN, { message: '请输入正确手机号' })
    @IsNotEmpty({ message: '请输入手机号' })
    @ApiProperty({ example: '13611177420' })
    readonly phoneNumber: string;

    /**
     * 短信验证码
     */
    @IsNotEmpty({ message: '请输入验证码' })
    @ApiProperty({ example: '0000' })
    readonly smsCode: string;

}

export class RegisterCodeDTO {

    /**
     * 手机号（系统唯一）
     */
    // @Matches(regMobileCN, { message: '请输入正确手机号' })
    @IsNotEmpty({ message: '请输入手机号' })
    @ApiProperty({ example: '13611177420' })
    readonly phoneNumber: string;

    @IsNotEmpty({ message: '请输入验证码ID' })
    @ApiProperty({ example: 'GaBUGhJzESU=' })
    readonly captchaId: string;

    @IsNotEmpty({ message: '请输入验证码' })
    @ApiProperty({ example: '0000' })
    readonly captchaCode: string;

}

export class RegisterDTO {

    /**
     * 用户名
     */
    @IsNotEmpty({ message: '请输入用户昵称' })
    @IsString({ message: '名字必须是 String 类型' })
    @ApiProperty({ example: "admin" })
    readonly name: string;

    /**
     * 用户密码
     */
    @IsNotEmpty({ message: '请输入密码' })
    @ApiProperty({ example: 'admin' })
    readonly password: string;
}

export class UserInfoDto {

    @ApiProperty({ example: '然叔' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: '123456' })
    @IsNotEmpty()
    password?: string;

    salt?: string

}
