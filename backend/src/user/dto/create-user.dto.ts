import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly initial_balance: number;
}
