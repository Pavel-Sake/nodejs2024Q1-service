import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import {
  createTrackInBd,
  getAllTrackFromBd,
  getTrackByIdFromBd,
  updateTrackByIdFromBd,
  deleteTrackByIdFromBd
} from 'src/db/track.db';

@Injectable()
export class TrackService {
  async create(createTrackDto: CreateTrackDto) {
    return await createTrackInBd(createTrackDto);
  }

  async findAll() {
    return await getAllTrackFromBd();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const track = await getTrackByIdFromBd(id);

    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track with this ID does not exist');
    }
  }

  async update(id: string, createTrackDto: CreateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');

      const track = await updateTrackByIdFromBd(id);

      if (!track) {
        throw new NotFoundException('Track with this ID does not exist');
      } else {
        track.name = createTrackDto.name;
        track.artistId = createTrackDto.artistId;
        track.albumId = createTrackDto.albumId;
        track.duration = createTrackDto.duration;
        return track;
      }
    }
  }

  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const track = await deleteTrackByIdFromBd(id);

    if (track) {
      throw new HttpException('Forbidden', 204);
    } else {
      throw new NotFoundException('Track with this ID does not exist');
    }
  }
}
