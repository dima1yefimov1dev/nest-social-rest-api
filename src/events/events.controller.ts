import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event-dto';
import { AuthGuardJwt } from 'src/auth/guards/auth-guard-jwt';
import { CurrentUser } from 'src/auth/decorators/current-user';
import { User } from 'src/users/entities/users.entity';
import { UpdateEventDto } from './dto/update-event-dto';

@Controller('/events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAll() {
    return await this.eventsService.getAllEvents();
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getEvent(@Param('id', ParseIntPipe) id: number) {
    return await this.eventsService.getEvent(id);
  }

  @Get('organized/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllEventsByUser(@Param('id', ParseIntPipe) userId: number) {
    const events = await this.eventsService.getAllEventsByUser(userId);

    return events;
  }

  @Post()
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async createEvent(@Body() input: CreateEventDto, @CurrentUser() user: User) {
    const newEvent = await this.eventsService.createNewEvent(input, user);

    return newEvent;
  }

  @Patch(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  async updateEvent(
    @Param('id', ParseIntPipe) id: number,
    @Body() input: UpdateEventDto,
    @CurrentUser() user: User,
  ) {
    const updatedEvent = await this.eventsService.updateEvent(id, input, user);

    return updatedEvent;
  }

  @Delete(':id')
  @UseGuards(AuthGuardJwt)
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(204)
  async deleteEvent(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    await this.eventsService.deleteEvent(id, user);
  }
}
