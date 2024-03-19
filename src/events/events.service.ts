import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './events.entity';

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

  public async createNewEvent(eventData: Partial<Event>) {
    const { name, description, when, address } = eventData;

    const newEvent = this.repository.create({
      name,
      description,
      when,
      address,
    });
    await this.repository.save(newEvent);

    return newEvent;
  }
}
