import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { ForbiddenException } from '@nestjs/common';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async create(createTaskDto: CreateTaskDto, authorId: string): Promise<Task> {
    const createdTask = await this.taskModel.create({
      title: createTaskDto.title,
      author: authorId,
    });
    return createdTask;
  }

  async findAll({ authorId, search }: { authorId: string; search: string }) {
    const filter: Record<string, any> = { author: authorId };
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    const tasks = await this.taskModel.find(filter);
    return tasks;
  }

  async delete(taskId: string, userId: string) {
    const task = await this.taskModel.findOne({ _id: taskId, author: userId });
    if (String(task.author) !== userId) {
      // this could be a guard I guess
      throw new ForbiddenException({
        message: 'Нет доступа',
      });
    }
    await this.taskModel.deleteOne({ _id: taskId });
  }

  async update(
    taskId: string,
    userId: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    const task = await this.taskModel.findOne({ _id: taskId, author: userId });

    // this could be a guard I guess
    if (String(task.author) !== userId) {
      throw new ForbiddenException({
        message: 'Нет доступа',
      });
    }

    if (updateTaskDto.title !== undefined) {
      task.title = updateTaskDto.title;
    }

    if (updateTaskDto.isFinished !== undefined) {
      task.isFinished = updateTaskDto.isFinished;
    }

    await task.save();
    return task;
  }
}
