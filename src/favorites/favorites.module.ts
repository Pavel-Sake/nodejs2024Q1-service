import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesArtists } from './entities/favoritesArtists.entity';
import { FavoritesAlbums } from './entities/favoritesAlbums.entity';
import { FavoritesTrack } from './entities/favoriteTrack.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from 'src/artist/entities/artist.entity';
import { Album } from 'src/album/entities/album.entity';
import { Track } from 'src/track/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FavoritesArtists,
      Artist,
      Album,
      Track,
      FavoritesAlbums,
      FavoritesTrack,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
