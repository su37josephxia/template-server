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
  HttpCode,
  Req,
  Session,

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
@Controller('api/web/template')
export class TemplateController {
  constructor(private readonly ContentService: ContentService) { }


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
  @Get('list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query() query: PaginationParamsDto,
    @Req() req
  ) {
    const userId = req.user.id
    const { pageSize, page } = query
    const { data, count } = await this.ContentService.findAllTemplate({
      ...query, userId
    });

    return {
      content: data,
      pageSize,
      pageNo: 1
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
  @Get('get')
  async findOne(@Query() query) {
    const { id } = query
    return await this.ContentService.findOne(id)
  }

}
