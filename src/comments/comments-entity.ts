import { Expose } from 'class-transformer';
import { Post } from 'src/posts/posts-entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  body: string;

  @Column()
  @Expose()
  postId: number;

  @Column()
  @Expose()
  userId: number;

  @ManyToOne(() => Post, (post) => post.comments)
  @Expose()
  post: Post;
}
