import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schemas/user.schemas';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @HttpCode(HttpStatus.CREATED)
  // @Patch('/save-contact-info')
  // contactInfo(@Body user:){
  //   const user = this.userService.addUserInfo()
  //   }
  // }
}
