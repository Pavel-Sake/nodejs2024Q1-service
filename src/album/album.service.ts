import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = await this.albumRepository.create(createAlbumDto);
    this.albumRepository.save(album);
    return album;
  }

  async findAll() {
    return await this.albumRepository.find();
  }

  async findOne(id: string) {
    const album = await this.albumRepository.findOneBy({ id: id });
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album with this ID does not exist');
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const album = await this.albumRepository.update(id, { ...updateAlbumDto });

    console.log('aaaaa', album);

    if (!album.affected) {
      throw new NotFoundException('Track with this ID does not exist');
    } else {
      const album = await this.albumRepository.findOneBy({ id: id });
      return album;
    }
  }

  async remove(id: string) {
    const album = await this.albumRepository.delete(id);

    if (album.affected) {
      throw new HttpException('Forbidden', 204);
    } else {
      throw new NotFoundException('Album with this ID does not exist');
    }
  }
}
