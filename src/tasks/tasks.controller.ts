import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Req,
  Param,
  Delete,
  Res,
  Query,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity, UpdateTaskDto } from './dto/update-task.dto';

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
  @ApiQuery({ name: 'search', description: 'Поиск', required: false })
  @ApiQuery({
    name: 'sortBy',
    description: 'Сортировка по полю',
    required: false,
  })
  @ApiResponse({ status: 200, type: [Task] })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(
    @Req() request: Request,
    @Query('search') search: string,
    @Query('sortBy') sortBy: string,
  ): Promise<Task[]> {
    return this.taskService.findAll({
      authorId: request.user.id,
      search,
      sortBy,
    });
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

  @ApiOperation({ summary: 'Редактирование задачи' })
  @ApiResponse({ status: 200, type: TaskEntity })
  @ApiBearerAuth('JWT')
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateTask(
    @Param('id') id: string,
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.taskService.update(id, request.user.id, updateTaskDto);
  }
}
