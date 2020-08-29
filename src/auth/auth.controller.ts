import { Body, Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.decorator';
import { AuthGuard } from './auth.guard';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {
  }

  @Get()
  async findAdmin() {
    return this.authService.findAdmin();
  }

  @Get(':id')
  @Roles('admin')
  async findUser(@Body() id: number) {
    return this.authService.findUser(id);
  }

  @Get('generate')
  async generateToken() {
    return this.authService.generateToken('localhost', ['admin', 'user', 'seller'] );
  }
}
