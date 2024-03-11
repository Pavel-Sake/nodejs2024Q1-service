import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly TrackService: TrackService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.TrackService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.TrackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.TrackService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() createTrackDto: CreateTrackDto) {
    return this.TrackService.update(id, createTrackDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.TrackService.delete(id);
  }
}
