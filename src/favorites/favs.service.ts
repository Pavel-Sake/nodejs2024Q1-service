import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  HttpException,
} from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import {
  getAllFavorites,
  addTrackToFavoriteInBd,
  deleteTrackFromFavoriteBd,
  getEntityFromFavorite,
  addAlbumToFavoriteInBd,
  deleteAlbumToFavoriteInBd,
  addArtistToFavoriteInBd,
  deleteArtistToFavoriteInBd,
} from 'src/db/favorites.bd';
import { getTrackByIdFromBd } from 'src/db/track.db';
import { getAlbumByIdFromBd } from 'src/db/album.bd';
import { getArtistByIdFromBd } from 'src/db/artist.bd';
import { validate } from 'uuid';

@Injectable()
export class FavsService {
  private validateId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  findAll() {
    return getAllFavorites();
  }

  async addTrackToFavorite(id: string) {
    this.validateId(id);
    const track = await getTrackByIdFromBd(id);

    if (!track) {
      throw new UnprocessableEntityException(
        'Track with this ID does not exist',
      );
    } else {
      addTrackToFavoriteInBd(track);
    }
  }

  async deleteTrackFromFavorite(id: string) {
    this.validateId(id);
    const track = await getEntityFromFavorite(id, 'tracks');

    if (!track) {
      throw new NotFoundException('Track with this ID id not in favorite');
    } else {
      deleteTrackFromFavoriteBd(track.id);
      throw new HttpException('Track is found and deleted', 204);
    }
  }

  async addAlbumToFavorite(id: string) {
    this.validateId(id);
    const album = await getAlbumByIdFromBd(id);

    if (!album) {
      throw new UnprocessableEntityException(
        'Album with this ID does not exist',
      );
    } else {
      addAlbumToFavoriteInBd(album);
    }
  }

  async deleteAlbumFromFavorite(id: string) {
    this.validateId(id);
    const album = await getEntityFromFavorite(id, 'albums');

    if (!album) {
      throw new NotFoundException('Track with this ID id not in favorite');
    } else {
      deleteAlbumToFavoriteInBd(album.id);
      throw new HttpException('ALbum is found and deleted', 204);
    }
  }

  async addArtistToFavorite(id: string) {
    this.validateId(id);
    const artist = await getArtistByIdFromBd(id);

    if (!artist) {
      throw new UnprocessableEntityException(
        'Album with this ID does not exist',
      );
    } else {
      addArtistToFavoriteInBd(artist);
    }
  }

  async deleteArtistFromFavorite(id: string) {
    this.validateId(id);
    const artist = await getEntityFromFavorite(id, 'artists');

    if (!artist) {
      throw new NotFoundException('Track with this ID id not in favorite');
    } else {
      deleteArtistToFavoriteInBd(artist.id);
      throw new HttpException('Artist is found and deleted', 204);
    }
  }
}
