import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //todo: make auth route

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async me(@Req() req) {
    return req.user;
  }
}
