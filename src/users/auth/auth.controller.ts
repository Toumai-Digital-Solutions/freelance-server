import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { LoginCredPasswordDto, RegisterEmailPasswordDto } from './auth.dto';
import * as bcrypt from 'bcrypt';
import { sql } from 'drizzle-orm';

import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Headers } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { DB } from 'src/db/db.module';
import notFoundParams from 'src/utils/functions/notFoundParams';
import users from 'src/db/schema/users';
dotenv.config();
@Controller('auth')
export class AuthController {
  private lng = process.env.DEFAULT_LANGUAGE;
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
    @Inject(DB) private db: NodePgDatabase,
  ) {}

  @Post('login')
  async loginWithEmailPassword(
    @Body() userDto: LoginCredPasswordDto,
    @Headers('ip') ip?: string,
    @Headers('mac') mac?: string,
    @Headers('browser') browser?: string,
    @Headers('device') device?: string,
    @Headers('os') os?: any,
    @Headers('user-agent') userAgent?: string,
    @Headers('notification-token') notificationToken?: string,
    // @Res() res,
  ) {
    const headers = {
      ip,
      mac,
      device,
      os,
      browser,
      userAgent,
      notificationToken,
    };

    console.log('headers', headers);
    // if (!geo) {
    //   throw new HttpException('geo is required', 400);
    // }

    notFoundParams(userDto);
    const user = await this.authService.loginWithEmailOrUsername(userDto.cred);

    if (!user) throw new HttpException('User is not found', 400);
    const samePwd = await bcrypt.compare(userDto.password, user.password);
    if (!samePwd) throw new HttpException('Password is not correct', 400);

    // switch (user.status) {
    //   case 'pending':
    //     throw new HttpException('User is pending', HttpStatus.BAD_GATEWAY);
    //   case 'inactive':
    //     throw new HttpException('User is inactive', HttpStatus.BAD_GATEWAY);
    //   case 'blocked':
    //     throw new HttpException('User is blocked', HttpStatus.BAD_GATEWAY);
    //   case 'deleted':
    //     throw new HttpException('User is deleted', HttpStatus.BAD_GATEWAY);
    //   case 'suspended':
    //     throw new HttpException('User is suspended', HttpStatus.BAD_GATEWAY);
    //   default:
    //     break;
    // }
    const token = this.jwtService.sign({
      id: user.id,
    });

    return {
      token,
    };
  }

  @Post('register')
  async registerWithEmailPassword(
    @Body()
    user: RegisterEmailPasswordDto,
  ) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(user.password)) {
      throw new HttpException('Password is not valid', 400);
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(user.email)) {
      throw new HttpException('Email is not valid', 400);
    }
    const [exist] = await this.db
      .select()
      .from(users)
      .where(sql`email=${user.email}`);
    if (exist) {
      throw new HttpException('Email is already exist', 400);
    }

    const newUser = await this.authService.registerWithEmailPassord(user);
    return newUser;
  }
}
