import { Body, Controller, Get, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { LoginUserDto, RegisterUserDto } from '../dto/users.dto';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @Roles('user')
  async loginWithToken(@Req() req: Request) {
    console.log(req);
  }

  @Post()
  async login(@Body() data: LoginUserDto) {
    console.log(data);
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    console.log(req);
  }

  @Put()
  async register(@Body() data: RegisterUserDto) {
    console.log(data);
  }
}
