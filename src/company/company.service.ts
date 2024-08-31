import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Company } from './schemas/company.schemas';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: mongoose.Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const company = await this.companyModel.create(createCompanyDto);
    if (company) {
      return {
        message: 'company created successfully',
      };
    } else {
      throw new HttpException(
        { message: 'User with this email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAll() {
    return await this.companyModel.find({});
  }

  async findOne(id: string) {
    const company = await this.companyModel.findById({ _id: id });
    if (company) {
      return {
        message: 'Company found!',
        company,
      };
    }
    throw new NotFoundException();
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: string) {
    return `This action removes a #${id} company`;
  }
}
