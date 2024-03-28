import { Controller, Get, Post, Param, Delete } from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  async addArtistToFavorite(@Param('id') id: string) {
    return await this.favoritesService.addArtistToFavorite(id);
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorite(@Param('id') id: string) {
    await this.favoritesService.deleteArtistFromFavorite(id);
  }

  @Post('album/:id')
  async addAlbumToFavorite(@Param('id') id: string) {
    return await this.favoritesService.addAlbumToFavorite(id);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorite(@Param('id') id: string) {
    await this.favoritesService.deleteAlbumFromFavorite(id);
  }

  @Post('track/:id')
  async addTrackToFavorite(@Param('id') id: string) {
    return await this.favoritesService.addTrackToFavorite(id);
  }

  @Delete('track/:id')
  async deleteTrackFromFavorite(@Param('id') id: string) {
    await this.favoritesService.deleteTrackFromFavorite(id);
  }
}
