import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Req,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @ApiOperation({ summary: 'Создание задачи' })
  @ApiResponse({ status: 200, type: Task })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(
    @Req() request: Request,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(createTaskDto, request.user.id);
  }

  @ApiOperation({ summary: 'Список задач пользователя' })
  @ApiResponse({ status: 200, type: [Task] })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() request: Request): Promise<Task[]> {
    return this.taskService.findAll(request.user.id);
  }

  @ApiOperation({ summary: 'Удаление задачи' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTask(
    @Param('id') id: string,
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.taskService.delete(id, request.user.id);
    res.json({});
  }
}
