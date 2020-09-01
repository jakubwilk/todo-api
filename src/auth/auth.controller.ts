import { Body, Controller, Get, Post, Put, Req, Res, UseGuards, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { LoginUserDto, RegisterUserDto } from '../dto/users.dto';
import { Request, Response } from 'express';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Roles('user')
  async autoLogin() {
    return await this.authService.loginWithToken();
  }

  @Post()
  async login(@Body() data: LoginUserDto, @Res() res: Response) {
    console.log(data);
    console.log(res);
  }

  @Get('logout')
  @Roles('user')
  async logout(@Req() req: Request) {
    console.log(req);
  }

  @Put()
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.createAccount(data);
  }
}
