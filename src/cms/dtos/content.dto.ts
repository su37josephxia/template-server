import { PartialType } from '@nestjs/swagger';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateContentDto {
    @ApiProperty({ example: 'ID' })
    id?: number;

    @ApiProperty({ example: '标题' })
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: '{\"title\":\"精通React\"}"' })
    @IsNotEmpty()
    content: string;

    @ApiProperty({ example: 'template' })
    @IsNotEmpty()
    type: string;

    @ApiProperty({ example: '1' })
    userId?: ObjectId;

    publish: boolean = false

    @ApiProperty()
    thumbnail?: object

}

export class UpdateContentDto extends PartialType(CreateContentDto) {

}
