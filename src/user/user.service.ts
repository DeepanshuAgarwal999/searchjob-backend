import { HttpException, HttpStatus, Injectable, Param } from '@nestjs/common';
import { User, UserDocument } from './schemas/user.schemas';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async create(userData: User):Promise<{ message: string; user?: UserDocument; }> {
    const findUser = await this.userModel
      .findOne({ email: userData.email })
      .exec();
    if (findUser) {
      throw new HttpException(
        { message: 'User with this email already exists' },
        HttpStatus.CONFLICT,
      );
    }
    const newUser = await this.userModel.create(userData);
    return {
      message: 'User created successfully',
      user: newUser,
    };
  }

  async findById(id: string): Promise<UserDocument | null> {
    return this.userModel.findById(id).exec();
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }
}
