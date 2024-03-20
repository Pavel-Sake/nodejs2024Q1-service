import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsInt,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null;

  @IsString()
  @IsOptional()
  albumId: string | null;

  @IsInt()
  @IsNotEmpty()
  @IsOptional()
  duration: number;
}
