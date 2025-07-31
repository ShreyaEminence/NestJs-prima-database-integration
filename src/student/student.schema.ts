import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StudentDocument = Student & Document;
// Document refer to mongoDB document , the form in which data is stored in mongoDb
// timestamp for default insertion of createdAt and updatedAt  in each doc
@Schema({ timestamps: true })
export class Student {
  // this makes fields required
  // you should use the definite assignment assertion !
  // tell TypeScript "Trust me, Mongoose will assign this.
  @Prop({ required: true })
  name!: string;
  @Prop({ required: true })
  email!: String;
  @Prop()
  Age?: number;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
