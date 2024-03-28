import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Post } from 'src/posts/posts-entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  @Field()
  id: number;

  @Column()
  @Expose()
  @Field()
  name: string;

  @Column()
  @Expose()
  @Field()
  username: string;

  @Column()
  @Expose()
  @Field()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => Post, (post) => post.likes)
  @JoinTable()
  @Expose()
  likedPosts: Post[];

  @OneToMany(() => Post, (post) => post.creator)
  @Expose()
  posts: Post[];
}
