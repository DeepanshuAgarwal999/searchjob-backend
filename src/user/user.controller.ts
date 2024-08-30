import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
