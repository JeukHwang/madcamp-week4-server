import { IsString } from 'class-validator';

export class CreateDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
}
