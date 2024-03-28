import {
  IsString,
  IsNotEmpty,
  IsDefined,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateArtistDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  @IsOptional()
  grammy: boolean;
}
