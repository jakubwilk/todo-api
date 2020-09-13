import {
  Body,
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
  Headers
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Roles } from './auth.decorator';
import { AuthGuard } from './auth.guard';
import { LoginUserDto, RegisterUserDto } from '../dto/users.dto';
import { Response } from 'express';
import { UserRoles } from '../constants/roles.consts';

@UseGuards(AuthGuard)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get()
  @HttpCode(200)
  @Roles(UserRoles.USER_ROLE)
  async autoLogin(@Headers() headers: any) {
    const { authorization } = headers;
    const token = authorization.split(" ")[1];

    return await this.authService.loginWithToken(token);
  }

  @Post()
  @HttpCode(200)
  async login(@Body() data: LoginUserDto, @Res() res: Response) {
    const token = await this.authService.loginUser(data);

    return res
      .set('Authorization', `Bearer ${token}`)
      .json({ message: ['User successfully logged']});
  }

  @Get('logout')
  @HttpCode(200)
  @Header('Authorization', 'none')
  @Roles(UserRoles.USER_ROLE)
  async logout(@Res() res: Response) {
    return res
      .clearCookie('authToken')
      .json({ message: ['User successfully logged']});
  }

  @Put()
  @HttpCode(201)
  async register(@Body() data: RegisterUserDto) {
    return await this.authService.createAccount(data);
  }
}
