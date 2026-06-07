import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ActorService } from './actor.service';

@Controller('actors')
export class ActorController {
  constructor(private readonly service: ActorService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() payload: any) {
    return this.service.create(payload);
  }
}
