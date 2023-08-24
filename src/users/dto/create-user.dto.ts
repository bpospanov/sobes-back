import { IsString, IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateUserDto {
  @ApiProperty({
    example: 'admin@admin.kz',
    description: 'email пользователя',
  })
  @IsEmail()
  @IsNotEmpty()
  @Transform(({ value }) => value.toLowerCase())
  readonly email: string;

  @ApiProperty({ example: 'admin', description: 'пароль пользователя' })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  readonly password: string;
}
