import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist
}
