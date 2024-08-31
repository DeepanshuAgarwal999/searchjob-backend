import { Injectable } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Applications } from './schemas/applications.schema';
import mongoose from 'mongoose';

@Injectable()
export class ApplicationsService {
  constructor(
    @InjectModel(Applications.name)
    private applicationsModel: mongoose.Model<Applications>,
  ) {}

  async create(createApplicationDto: CreateApplicationDto) {
    const application =
      await this.applicationsModel.create(createApplicationDto);
    if (application)
      return { message: 'Job application created successfully', application };
  }

  async findAll() {
    return await this.applicationsModel.find({});
  }

  async find(id: string) {
    return await this.applicationsModel.find({ userId: id });
  }

  update(id: number, updateApplicationDto: UpdateApplicationDto) {
    return `This action updates a #${id} application`;
  }

  remove(id: number) {
    return `This action removes a #${id} application`;
  }
}
