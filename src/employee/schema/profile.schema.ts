import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema({ timestamps: true })
export class Profile extends Document {
  @Prop({ required: true })
  Experience!: string;

  @Prop({ required: true })
  Qualification!: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
