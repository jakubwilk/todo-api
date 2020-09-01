import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { LoginUserDto, RegisterUserDto } from '../dto/users.dto';
import { Request } from 'express';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Roles('user')
  async autoLogin(@Req() req: Request) {
    return await this.authService.loginWithToken();
  }

  @Post()
  async login(@Body() data: LoginUserDto) {
    console.log(data);
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
