import { BadRequestException, Inject } from "@nestjs/common";
import { MongoRepository } from 'typeorm';
import { User } from "../entities/user.mongo.entity";
import { RegisterDTO } from "../dtos/auth.dto";
import { encryptPassword, makeSalt } from "src/shared/utils/cryptogram.util";

export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: MongoRepository<User>
    ) { }

    async registerByName(registerDTO: RegisterDTO) {
        // 校验输入信息
        this.checkRegisterForm(registerDTO)
        const { password, name } = registerDTO
        // 加盐处理
        const { salt, hashPassword } = this.getPassword(password)

        const newUser: User = new User()
        newUser.name = name
        newUser.password = hashPassword
        newUser.salt = salt
        return await this.userRepository.save(newUser)
    }

    async checkRegisterForm(dto: RegisterDTO) {
        const { name } = dto
        const hasUser = await this.userRepository.findOneBy({
            name
        })
        if (hasUser) {
            throw new BadRequestException('用户已存在')
        }
    }

    getPassword(password) {
        const salt = makeSalt()
        const hashPassword = encryptPassword(password, salt)
        return { salt, hashPassword }
    }

}