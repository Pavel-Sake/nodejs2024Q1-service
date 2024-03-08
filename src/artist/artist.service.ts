import {
  BadRequestException,
  Injectable,
  ForbiddenException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import {
  createArtistInBd,
  getAllArtistsFromBd,
  getArtistByIdFromBd,
  updateArtistByIdFromBd,
  deleteArtistByIdFromBd,
} from 'src/db/artist.bd';
import { validate } from 'uuid';

@Injectable()
export class ArtistService {
  async create(createArtistDto: CreateArtistDto) {
    return await createArtistInBd(createArtistDto);
  }

  async findAll() {
    return await getAllArtistsFromBd();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = await getArtistByIdFromBd(id);

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist with this ID does not exist');
    }
  }

  async update(id: string, createArtistDto: CreateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = await updateArtistByIdFromBd(id);

    if (!artist) {
      throw new NotFoundException('Artist with this ID does not exist');
    } else {
      artist.name = createArtistDto.name;
      artist.grammy = createArtistDto.grammy;
      return artist;
    }
  }

  async delete(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const artist = await deleteArtistByIdFromBd(id);

    if (artist) {
      throw new HttpException('Forbidden', 204);
    } else {
      throw new NotFoundException('Artist with this ID does not exist');
    }
  }
}
