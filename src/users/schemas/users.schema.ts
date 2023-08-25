import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: true,
})
export class User {
  @ApiProperty({
    example: 'example@example.com',
    description: 'email пользователя',
  })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'mypassword', description: 'пароль пользователя' })
  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
