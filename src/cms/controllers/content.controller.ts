import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Patch,
  Query,
  Res,
  Scope,
  UseGuards,
  HttpStatus,

} from '@nestjs/common';
import { ContentService } from '../services/content.service';

import { ApiOperation, ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import {
  BaseApiErrorResponse, BaseApiResponse, SwaggerBaseApiResponse
} from '../../shared/dtos/base-api-response.dto';
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto'
import { CreateContentDto, UpdateContentDto } from '../dtos/content.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('模版')
@Controller('contents')
export class ContentController {
  constructor(private readonly ContentService: ContentService) { }

  @ApiOperation({
    summary: '新增模版',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: SwaggerBaseApiResponse(CreateContentDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() createCourseDto: CreateContentDto) {
    return {
      data: await this.ContentService.create(createCourseDto),
    }
  }

  @ApiOperation({
    summary: '查找所有模版',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse([CreateContentDto]),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get()
  async findAll(
    @Query() query: PaginationParamsDto
  ) {

    const { data, count } = await this.ContentService.findAll(query);
    return {
      data,
      meta: { total: count }
    }
  }

  @ApiOperation({
    summary: '查找单个模版',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateContentDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      data: await this.ContentService.findOne(id)
    }
  }

  @ApiOperation({
    summary: '更新单个模版',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SwaggerBaseApiResponse(CreateContentDto),
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    type: BaseApiErrorResponse,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCourseDto: UpdateContentDto) {
    return {
      data: await this.ContentService.update(id, updateCourseDto)
    }
  }

  @ApiOperation({
    summary: '删除单个模版',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ContentService.remove(id);
  }
}
