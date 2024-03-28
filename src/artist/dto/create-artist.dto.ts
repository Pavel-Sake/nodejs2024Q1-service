import { IsString, IsNotEmpty, IsDefined, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsNotEmpty()
  @IsDefined()
  @IsBoolean()
  grammy: boolean;
}
