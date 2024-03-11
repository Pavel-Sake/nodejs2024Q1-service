import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FavsService } from './favs.service';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  findAll() {
    return this.favsService.findAll();
  }

  @Post('track/:id')
  async addTrackToFavorite(@Param('id') id: string) {
    await this.favsService.addTrackToFavorite(id);
  }

  @Delete('track/:id')
  async deleteTrackFromFavorite(@Param('id') id: string) {
    await this.favsService.deleteTrackFromFavorite(id);
  }

  @Post('album/:id')
  async addAlbumToFavorite(@Param('id') id: string) {
    await this.favsService.addAlbumToFavorite(id);
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorite(@Param('id') id: string) {
    await this.favsService.deleteAlbumFromFavorite(id);
  }

  @Post('artist/:id')
  async addArtistToFavorite(@Param('id') id: string) {
    await this.favsService.addArtistToFavorite(id);
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorite(@Param('id') id: string) {
    await this.favsService.deleteArtistFromFavorite(id);
  }
}
