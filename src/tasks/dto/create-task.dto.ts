import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    example: 'Купить хлеба',
    description: 'название задачи',
  })
  @IsString()
  readonly title: string;
}
