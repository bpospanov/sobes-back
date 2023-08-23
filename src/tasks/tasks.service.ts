import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schemas/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';

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

  async findAll(authorId: string) {
    const tasks = await this.taskModel.find({ author: authorId });
    return tasks;
  }
}
