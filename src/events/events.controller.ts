import { Body, Controller, Get, Post } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './events.entity';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getAll() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  create(@Body() eventData: Partial<Event>): Promise<Event> {
    return this.eventsService.createNewEvent(eventData);
  }
}
