import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const track = await this.trackRepository.create(createTrackDto);
    return await this.trackRepository.save(track);
  }

  async findAll() {
    return await this.trackRepository.find();
  }

  async findOne(id: string) {
    const track = await this.trackRepository.findOneBy({ id: id });

    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track with this ID does not exist');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.trackRepository.update(id, { ...updateTrackDto });

    if (track.affected) {
      const track = await this.trackRepository.findOneBy({ id: id });
      return track;
    } else {
      throw new NotFoundException('Track with this ID does not exist');
    }
  }

  async delete(id: string) {
    const track = await this.trackRepository.delete(id);

    if (track.affected) {
      throw new HttpException('Deleted', 204);
    } else {
      throw new NotFoundException('Track with this ID does not exist');
    }
  }
}
