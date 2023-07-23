import { IsString } from 'class-validator';

export class SignDto {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
