import { Body, Controller, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from '../roles/roles.decorator';
import { RolesGuard } from '../roles/roles.guard';

@UseGuards(RolesGuard)
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
}
