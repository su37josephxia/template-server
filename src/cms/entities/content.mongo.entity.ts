import { PrimaryGeneratedColumn, Entity, Column, Unique, UpdateDateColumn, ObjectIdColumn, CreateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { ObjectId } from 'mongoose';
import { Common } from '@/shared/entities/common.entity';
@Entity()
export class Content extends Common {

    @PrimaryGeneratedColumn()
    id: number

    @Column('text')
    title: string;

    @Column('text')
    content: string;

    @Column('text')
    type: string;

    @Column()
    userId?: ObjectId


}
