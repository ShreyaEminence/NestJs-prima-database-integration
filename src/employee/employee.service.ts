import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Employee, EmployeeDocument } from './schema/employee.schema';
import { Model } from 'mongoose';
import { Profile, ProfileDocument } from './schema/profile.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<EmployeeDocument>,
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async getEmployeeById(id: string) {
    const emp = await this.employeeModel
      .findById(id)
      .populate('Profile')
      .exec();

    if (emp) {
      const profile = emp.Profile as any;

      return {
        _id: emp._id,
        Name: emp.Name,
        email: emp.email,
        Age: emp.Age,
        Experience: profile?.Experience,
        Qualification: profile?.Qualification,
      };
    }

    return null; 
  }

  async getAllEmployees() {
    const employees = await this.employeeModel
      .find({})
      .populate('Profile')
      .exec();
    const formatted = employees.map((emp) => {
      const profile = emp.Profile as any;

      return {
        _id: emp._id,
        Name: emp.Name,
        email: emp.email,
        Age: emp.Age,
        Experience: profile?.Experience,
        Qualification: profile?.Qualification,
      };
    });
    return formatted;
  }
  async createNewEmployee(data: Partial<Employee & Profile>) {
    const { Name, Age, email, Experience, Qualification } = data;
    const profile = await new this.profileModel({
      Experience,
      Qualification,
    }).save();

    const employee = await new this.employeeModel({
      Name,
      Age,
      email,
      Profile: profile._id,
    }).save();

    return employee;
  }
}
