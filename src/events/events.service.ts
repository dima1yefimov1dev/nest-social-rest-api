import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';
import { CreateEventDto } from './dto/create-event-dto';
import { User } from 'src/users/entities/users.entity';
import { UpdateEventDto } from './dto/update-event-dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  public async getAllEvents() {
    const events = await this.repository.find();

    return events;
  }

  public async getEvent(id: number) {
    const event = await this.repository.findOne({ where: { id } });

    return event;
  }

  public async createNewEvent(input: CreateEventDto, user: User) {
    const newEvent = this.repository.create({ ...input, user });

    await this.repository.save(newEvent);

    return newEvent;
  }

  public async updateEvent(
    id: number,
    updateInput: UpdateEventDto,
    user: User,
  ) {
    const eventToUpdate = await this.repository.findOne({ where: { id } });

    if (!eventToUpdate) {
      throw new NotFoundException('this event doesn`t exist');
    }

    if (eventToUpdate.userId !== user.id) {
      throw new ForbiddenException();
    }

    const updatedEvent = await this.repository.save({ id, ...updateInput });
    return updatedEvent;
  }

  public async deleteEvent(id: number, user: User) {
    const eventToDelete = await this.repository.findOne({ where: { id } });

    if (!eventToDelete) {
      throw new NotFoundException('this event doesn`t exist');
    }

    if (eventToDelete.userId !== user.id) {
      throw new ForbiddenException(
        'you don`t have access to delete this event',
      );
    }

    await this.repository.delete(eventToDelete);
  }

  public async getAllEventsByUser(userId: number) {
    const eventsOfUser = await this.repository.find({ where: { userId } });

    return eventsOfUser;
  }
}
