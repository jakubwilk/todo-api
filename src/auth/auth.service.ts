import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  findAdmin(): string {
    return "admin";
  }

  findUser(id: number): string {
    if (id === 0) throw new Error("User not available");

    return "martin";
  }
}
