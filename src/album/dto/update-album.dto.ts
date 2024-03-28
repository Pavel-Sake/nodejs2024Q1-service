import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateAlbumDto {
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsInt()
  @IsNotEmpty()
  @IsDefined()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
