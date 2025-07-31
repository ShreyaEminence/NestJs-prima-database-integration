import { Injectable } from '@nestjs/common';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private StudentModel: Model<StudentDocument>,
  ) {}
  // make use of Partial when any of the field is optional
  async createStudent(data: Partial<Student>): Promise<Student> {
    const newStudent = new this.StudentModel(data);
    // this command used gto save data to mongoDb database
    return newStudent.save();
  }
  async getStudents() {
    const students = await this.StudentModel.find({});
    return students;
  }
  async getStudentById(id: string) {
    const student = await this.StudentModel.findById({ _id: id });
    if (!student) {
      return `No Student with ${id} exists in database.`;
    } else {
      return student;
    }
  }
}
