import { IsNotEmpty, Matches } from "class-validator";
import { regPositiveOrEmpty } from "../utils/regex.util";
import { ApiProperty } from "@nestjs/swagger";

export class IdDTO {

  /**
   * 主键 id
   */
  @IsNotEmpty({ message: 'id 不能为空' })
  // @Matches(regPositiveOrEmpty, { message: '请输入有效 id' })
  @ApiProperty({ example: 1 })
  readonly id: number
}