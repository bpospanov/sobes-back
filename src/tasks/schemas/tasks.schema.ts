import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/schemas/users.schema';

export type TaskDocument = mongoose.HydratedDocument<Task>;

@Schema({
  timestamps: true,
})
export class Task {
  @ApiProperty({ example: 'Buy 2 bananas', description: 'название задачи' })
  @Prop()
  title: string;

  @ApiProperty({ example: false, description: 'выполнена ли задача' })
  @Prop({ default: false })
  isFinished: boolean;

  @ApiProperty({
    example: '5349b4ddd2781d08c09890f3',
    description: 'автор задачи',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
