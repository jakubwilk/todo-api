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
  // boolean | Promise<boolean> | Observable<boolean>
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.headers;

    if (!user.auth_token) return false;

    const userRoles = await this.authService.extractRolesFromToken(user.auth_token);
    const matchRoles = () => userRoles.some(role => roles.includes(role));

    return matchRoles();

    // const matchRoles = () => this.jwtService.verify(user.auth_token, { secret: process.env['JWT_SECRET'] });
    //
    // console.log(matchRoles());

    // Check cookie with JWT token and get user roles

    //console.log(typeof JSON.stringify(user.auth_role));
    // const matchRoles = () => user.auth_role.some(role => roles.includes(role));
    //
    // return user && matchRoles();
  }
}