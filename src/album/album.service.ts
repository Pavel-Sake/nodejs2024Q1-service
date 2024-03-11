import {
  BadRequestException,
  Injectable,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { validate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {
  createAlbumInBd,
  getAllAlbumsFromBd,
  getAlbumByIdFromBd,
  updateAlbumByIdFromBd,
  deleteAlbumByIdFromBd,
} from 'src/db/album.bd';

@Injectable()
export class AlbumService {
  async create(createAlbumDto: CreateAlbumDto) {
    return await createAlbumInBd(createAlbumDto);
  }

  async findAll() {
    return await getAllAlbumsFromBd();
  }

  async findOne(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = await getAlbumByIdFromBd(id);

    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album with this ID does not exist');
    }
  }

  async update(id: string, createAlbumDto: CreateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }

    const album = await updateAlbumByIdFromBd(id);

    if (!album) {
      throw new NotFoundException('Track with this ID does not exist');
    } else {
      album.name = createAlbumDto.name;
      album.year = createAlbumDto.year;
      album.artistId = createAlbumDto.artistId;
      return album;
    }
  }

  async remove(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('ID is not valid');
    }
    const album = await deleteAlbumByIdFromBd(id);

    if (album) {
      throw new HttpException('Forbidden', 204);
    } else {
      throw new NotFoundException('Album with this ID does not exist');
    }
  }
}
