import { Injectable, NotFoundException, HttpException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Repository } from 'typeorm';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const newArtist = await this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(newArtist);
  }

  async findAll() {
    return await this.artistRepository.find();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findOneBy({ id: id });

    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist with this ID does not exist');
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.update(id, updateArtistDto);

    if (artist.affected) {
      const artist = await this.artistRepository.findOneBy({ id: id });
      return artist;
    } else {
      throw new NotFoundException('Artist with this ID does not exist');
    }
  }

  async delete(id: string) {
    const artist = await this.artistRepository.delete(id);

    if (artist.affected) {
      throw new HttpException('Deleted', 204);
    } else {
      throw new NotFoundException('Artist with this ID does not exist');
    }
  }
}
