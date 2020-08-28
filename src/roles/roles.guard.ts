import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true;

    const request = context.switchToHttp().getRequest();
    const user = request.headers;

    // Check cookie with JWT token and get user roles

    //console.log(typeof JSON.stringify(user.auth_role));
    // const matchRoles = () => user.auth_role.some(role => roles.includes(role));
    //
    // return user && matchRoles();
  }
}
// <- TS Error: Declaration or statement is required here???