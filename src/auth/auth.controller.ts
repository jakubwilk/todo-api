import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
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
  @HttpCode(200)
  @Roles('user')
  async autoLogin() {
    return {
      message: ['User successfully logged'],
      error: ''
    }
  }

  @Post()
  @HttpCode(200)
  async login(@Body() data: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.loginUser(data);

    return res
      .cookie('authToken', token, { secure: true, httpOnly: true, maxAge: 86400000 })
      .set('Authorization', `Bearer ${token}`)
      .json({ message: ['User successfully logged'], error: '' });
  }

  @Get('logout')
  @HttpCode(200)
  @Roles('user')
  async logout(@Req() req: Request) {
    console.log(req);
  }

  @Put()
  @HttpCode(201)
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.createAccount(data);
  }
}
