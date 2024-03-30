import { ObjectType, Field } from '@nestjs/graphql';
import { Expose } from 'class-transformer';
import { Post } from 'src/posts/posts-entity';
import {
  Column,
  Entity,
  Index,
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
  @Index({ unique: true })
  username: string;

  @Column()
  @Expose()
  @Field()
  @Index({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'user' })
  role: string;

  @ManyToMany(() => Post, (post) => post.likes)
  @JoinTable()
  @Expose()
  likedPosts: Post[];

  @OneToMany(() => Post, (post) => post.creator)
  @Expose()
  posts: Post[];
}
