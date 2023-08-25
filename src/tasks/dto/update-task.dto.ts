import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, IsOptional } from 'class-validator';

export class UpdateTaskDto {
  @ApiProperty({
    example: 'Купить хлеба',
    description: 'название задачи',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: true,
    description: 'статус выполнения задачи',
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  readonly isFinished: boolean;
}

export class TaskEntity {
  @ApiProperty({
    example: '62e27b1b06adfcddf4619fc1',
    description: 'ID задачи',
    required: false,
  })
  @IsString()
  readonly _id: string;

  @ApiProperty({
    example: 'Купить хлеба',
    description: 'название задачи',
    required: false,
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    example: true,
    description: 'статус выполнения задачи',
    required: false,
  })
  @IsBoolean()
  readonly isFinished: boolean;
}
