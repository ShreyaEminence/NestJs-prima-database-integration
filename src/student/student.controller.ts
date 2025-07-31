import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StudentService } from './student.service';
import { Student } from './student.schema';
import mongoose from 'mongoose';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Get()
  async getStudent() {
    return this.studentService.getStudents();
  }
  @Get(':id')
  async getSpecificStudent(@Param('id') id: string) {
    if (mongoose.isValidObjectId(id)) {
      return this.studentService.getStudentById(id);
    } else {
      return `Sorry ${id} is invalid. Please Find with valid id.`;
    }
  }
  @Post()
  async addStudent(@Body() data: Partial<Student>) {
    return this.studentService.createStudent(data);
  }
}
