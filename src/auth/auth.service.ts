import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtpayload';
import { User } from 'src/user/schemas/user.schemas';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  //   async validateUser(email: string, password: string) {}

  async login(
    userInfo: User,
  ): Promise<{ id: string; name: string; token: string }> {
    let user = await this.userService.findByEmail(userInfo.email);
    if (!user) {
      if (userInfo.provider) {
        user = (await this.userService.create(userInfo)).user;
      } else {
        throw new NotFoundException('Email not found');
      }
    }
    if (userInfo.password && user.password) {
      const isPasswordMatch = await compare(userInfo.password, user.password);

      if (!isPasswordMatch)
        throw new UnauthorizedException('Invalid credentials!');
    }

    const payload: AuthJwtPayload = {
      name: user.name,
      email: user.email,
      id: user._id as string,
    };

    return {
      id: user._id.toString() as string,
      name: user.name,
      token: this.jwtService.sign(payload),
    };
  }

  async create(userData: User) {
    try {
      const result = await this.userService.create(userData);
      return {
        status: HttpStatus.CREATED,
        message: result.message,
        data: result.user,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
