import { Injectable, Inject } from '@nestjs/common';
import { In, Like, Raw, MongoRepository, ObjectID } from 'typeorm';
import { Content } from '../entities/content.mongo.entity'
import { PaginationParamsDto } from '../../shared/dtos/pagination-params.dto'
import { CreateContentDto, UpdateContentDto } from '../dtos/content.dto';

@Injectable()
export class ContentService {
  constructor(
    @Inject('CONTENT_REPOSITORY')
    private contentRepository: MongoRepository<Content>
  ) { }


  async create(dto: CreateContentDto) {
    const ret = await this.contentRepository.save(dto)
    // await this.sync('' + ret._id)
    return ret
  }

  async findAll({ pageSize, page }: PaginationParamsDto): Promise<{ data: Content[], count: number }> {

    const [data, count] = await this.contentRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip: (page - 1) * pageSize,
      take: (pageSize * 1),
      cache: true
    })
    return {
      data, count
    }
  }

  async findOne(id: string) {
    return await this.contentRepository.findOneBy(id)
  }

  async update(id: string, course: UpdateContentDto) {
    // 去除时间戳和id
    ['_id', 'createdAt', 'updatedAt'].forEach(
      k => delete course[k]
    )
    const ret = await this.contentRepository.update(id, course)

    // TODO 暂时使用同步刷新
    // await this.sync(id)
    return ret
  }


  async remove(id: string): Promise<any> {
    return await this.contentRepository.delete(id)
  }
}
