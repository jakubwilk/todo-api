import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
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
    const user = request.headers;

    if (!user.auth_token) return false;

    const userRoles = await this.authService.extractRolesFromToken(user.auth_token);
    const matchRoles = () => userRoles.some(role => roles.includes(role));

    return matchRoles();
  }
}