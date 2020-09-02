import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly authService: AuthService
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) throw new UnauthorizedException({ message: ['Missing user token'], error: 'Unauthorized' });

    const isValidToken = await this.authService.validateToken(token.replace('Bearer ', ''));
    if (!isValidToken) throw new HttpException({ message: ['Unfortunately token is not valid'], error: 'Unauthorized' }, HttpStatus.UNAUTHORIZED);

    const userRoles = await this.authService.extractRolesFromToken(token.replace('Bearer ', ''));
    const matchRoles = () => userRoles.some(role => roles.includes(role));

    return matchRoles();
  }
}