import { Expose } from 'class-transformer';
import { Event } from 'src/events/events.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Expose()
  id: number;

  @Column()
  @Expose()
  name: string;

  @Column()
  @Expose()
  username: string;

  @Column()
  @Expose()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.user)
  @Expose()
  events: Event[];
}
