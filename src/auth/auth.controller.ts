import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/schemas/user.schemas';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userInfo: User) {
    try {
      console.log(userInfo);
      const user = await this.authService.login(userInfo);
      console.log(user);
      return {
        message: 'Logged in successfully!',
        user,
      };
    } catch (error) {
      console.log(error);
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() userData: User) {
    return this.authService.create(userData);
  }
}
