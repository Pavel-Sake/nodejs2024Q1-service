import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnprocessableEntityException,
  HttpException,
} from '@nestjs/common';
import { FavoritesArtists } from './entities/favoritesArtists.entity';
import { FavoritesAlbums } from './entities/favoritesAlbums.entity';
import { FavoritesTrack } from './entities/favoriteTrack.entity';
import { validate } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

async function checkIsEntityExist(repository, id) {
  const entity = await repository.findOneBy({ id: id });

  if (!entity) {
    throw new UnprocessableEntityException();
  }
}

function getAndfillFavoritesFields(artists, albums, tracks) {
  const favorites = {
    artists: [],
    album: [],
    track: [],
  };

  favorites.artists = artists.map((artist) => {
    return artist.artist;
  });

  favorites.album = albums.map((album) => {
    return album.album;
  });

  favorites.track = tracks.map((track) => {
    return track.track;
  });

  return favorites;
}

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoritesArtists)
    private favoritesArtistRepository: Repository<FavoritesArtists>,
    @InjectRepository(FavoritesAlbums)
    private favoritesAlbumRepository: Repository<FavoritesAlbums>,
    @InjectRepository(FavoritesTrack)
    private favoritesTrackRepository: Repository<FavoritesTrack>,
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
    @InjectRepository(Track)
    private trackRepository: Repository<Track>,
  ) {}

  private validateId(id: string) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid ID format');
    }
  }

  async findAll() {
    const [artists, album, tracks] = await Promise.all([
      this.favoritesArtistRepository.find({
        relations: { artist: true },
      }),
      this.favoritesAlbumRepository.find({
        relations: { album: true },
      }),
      this.favoritesTrackRepository.find({
        relations: { track: true },
      }),
    ]);

    const favorites = getAndfillFavoritesFields(artists, album, tracks);
    return favorites;
  }

  async addArtistToFavorite(id: string) {
    this.validateId(id);
    await checkIsEntityExist(this.artistRepository, id);

    const favoriteArtist = await this.favoritesArtistRepository.create({
      artistId: id,
    });
    await this.favoritesArtistRepository.save(favoriteArtist);
    return favoriteArtist;
  }

  async deleteArtistFromFavorite(id: string) {
    this.validateId(id);
    await checkIsEntityExist(this.artistRepository, id);
    const artist = await this.favoritesArtistRepository.delete({
      artistId: id,
    });

    if (artist.affected) {
      throw new HttpException('Track is found and deleted', 204);
    } else {
      throw new NotFoundException('Artist with this ID id not in favorite');
    }
  }

  async addAlbumToFavorite(id: string) {
    this.validateId(id);
    await checkIsEntityExist(this.albumRepository, id);
    const favoriteAlbum = await this.favoritesAlbumRepository.create({
      albumId: id,
    });
    await this.favoritesAlbumRepository.save(favoriteAlbum);
    return favoriteAlbum;
  }

  async deleteAlbumFromFavorite(id: string) {
    this.validateId(id);

    const album = await this.favoritesAlbumRepository.delete({
      albumId: id,
    });

    if (album.affected) {
      throw new HttpException('Artist is found and deleted', 204);
    } else {
      throw new NotFoundException('Artist with this ID id not in favorite');
    }
  }

  async addTrackToFavorite(id: string) {
    this.validateId(id);
    await checkIsEntityExist(this.trackRepository, id);

    const favoriteTrack = await this.favoritesTrackRepository.create({
      trackId: id,
    });

    await this.favoritesTrackRepository.save(favoriteTrack);
    return favoriteTrack;
  }

  async deleteTrackFromFavorite(id: string) {
    this.validateId(id);

    const track = await this.favoritesTrackRepository.delete({
      trackId: id,
    });

    if (track.affected) {
      throw new HttpException('Track is found and deleted', 204);
    } else {
      throw new NotFoundException('Track with this ID id not in favorite');
    }
  }
}
