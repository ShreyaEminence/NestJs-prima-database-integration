import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Profile } from './schema/profile.schema';
import { Employee } from './schema/employee.schema';
import mongoose from 'mongoose';
import { Response } from 'express';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly EmployeeService: EmployeeService) {}

  @Get()
  async getEmployeeList() {
    return this.EmployeeService.getAllEmployees();
  }
  @Get(':id')
  async findEmployee(@Param('id') id: string, @Res() res: Response) {
    if (!mongoose.isValidObjectId(id)) {
      return res
        .status(400)
        .send(
          `<h1>Sorry, "${id}" is invalid. Please provide a valid MongoDB ObjectId.</h1>`,
        );
    }

    const employee = await this.EmployeeService.getEmployeeById(id);
    if (!employee) {
      return res
        .status(404)
        .send(`<h1>No employee found with id "${id}".</h1>`);
    }
    return res.status(200).json(employee);
  }
  @Post()
  async createEmployee(@Body() data: Partial<Employee & Profile>) {
    return this.EmployeeService.createNewEmployee(data);
  }
}
