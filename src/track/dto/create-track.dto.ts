import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsOptional,
  IsInt,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  artistId: string | null; // refers to Artist

  @IsString()
  @IsOptional()
  albumId: string | null; // refers to Album

  @IsInt()
  @IsNotEmpty()
  duration: number; // integer number
}
