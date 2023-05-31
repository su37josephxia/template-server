import { IsNotEmpty, Matches } from "class-validator";

export class IdDTO {

  /**
   * 主键 id
   */
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number
}