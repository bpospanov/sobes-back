import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'example@mail.com',
    description: 'email пользователя',
  })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'mypassword', description: 'пароль пользователя' })
  @IsString()
  readonly password: string;
}
