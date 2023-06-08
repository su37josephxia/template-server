import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/user.mongo.entity";
import { ObjectID, MongoRepository } from 'typeorm';
import { BadRequestException, Inject, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { encryptPassword, makeSalt } from '../../shared/utils/cryptogram.util';
import { UserInfoDto, RegisterDTO } from '../dtos/auth.dto';
import { LoginDTO } from "../dtos/login.dto";
import { UserService } from "./user.service";

export class AuthService {
    constructor(
        private readonly jwtService: JwtService,

        @Inject('USER_REPOSITORY')
        private userRepository: MongoRepository<User>,
    ) {

    }


    async login(login: LoginDTO) {
        // 校验用户信息
        const user = await this.checkLoginForm(login)
        const token = await this.certificate(user)
        return {
            ...user,
            sessionId: `Bearer ${token}`
        }
    }

    async registerByName(dto: LoginDTO) {

        const { name, password } = dto
        const result = await this.register({
            phoneNumber: '',
            name,
            password,
            passwordRepeat: password
        })
        return result
    }


    /**
     * 注册
     * @param registerDTO 
     * @returns 
     */
    async register(
        registerDTO: RegisterDTO
    ): Promise<any> {

        await this.checkRegisterForm(registerDTO)

        const { name, password, phoneNumber } = registerDTO;
        // const salt = makeSalt(); // 制作密码盐
        // const hashPassword = encryptPassword(password, salt);  // 加密密码

        const { salt, hashPassword } = this.getPassword(password)

        const newUser: User = new User()
        newUser.name = name
        newUser.phoneNumber = phoneNumber
        newUser.password = hashPassword
        newUser.salt = salt
        const data = await this.userRepository.save(newUser)
        delete data.password
        delete data.salt
        return {
            data
        }
    }


    /**
   * 校验注册信息
   * @param registerDTO 
   */
    async checkRegisterForm(
        registerDTO: RegisterDTO,
    ): Promise<any> {

        if (registerDTO.password !== registerDTO.passwordRepeat) {
            throw new BadRequestException('两次输入的密码不一致，请检查')
        }
        const { name } = registerDTO
        const hasUser = await this.userRepository
            .findOneBy({ name })
        console.log('name', hasUser)
        if (hasUser) {
            throw new BadRequestException('用户已存在')
        }
    }


    getPassword(password) {
        const salt = makeSalt()
        const hashPassword = encryptPassword(password, salt)
        return { salt, hashPassword }
    }

    async checkLoginForm(loginDto: LoginDTO) {
        const { name, password } = loginDto
        const user = await this.userRepository.findOneBy({
            name
        })
        if (!user) {
            throw new InternalServerErrorException('用户不存在')
        }
        const { password: dbPassword, salt } = user
        const currentHashPassword = encryptPassword(password, salt)
        if (currentHashPassword !== dbPassword) {
            throw new InternalServerErrorException('密码错误')
        }
        return user
    }


    async certificate(user: User) {
        const payload = {
            id: user._id
        }
        const token = this.jwtService.sign(payload)
        return token
    }

    async info(id: string) {
        // 查询用户并获取权限
        const user = await this.userRepository.findOneBy(id)
        const data: UserInfoDto = Object.assign({}, user)

        return data

    }
}