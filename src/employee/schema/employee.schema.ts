import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type EmployeeDocument = Employee & Document;

@Schema({ timestamps: true })
export class Employee extends Document {
  @Prop({ required: true })
  Name!: string;

  @Prop({ required: true })
  email!: String;

  @Prop()
  Age?: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Profile' })
  Profile!: MongooseSchema.Types.ObjectId;
}

export const EmployeeSchema = SchemaFactory.createForClass(Employee);
