import { IsString, IsNotEmpty, IsDefined } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  login: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  password: string;
}
