import { Expose } from 'class-transformer';
import { Comment } from 'src/comments/comments-entity';
import { User } from 'src/users/users.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  title: string;

  @Column()
  @Expose()
  body: string;

  @ManyToMany(() => User, (user) => user.likedPosts)
  @JoinTable()
  @Expose()
  likes: User[];

  @ManyToOne(() => User, (user) => user.posts)
  @Expose()
  creator: User;

  @Column({ name: 'user_id' })
  @Expose()
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  @Expose()
  comments: Comment[];
}
