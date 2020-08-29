import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService
  ) {
  }

  findAdmin(): string {
    return "admin";
  }

  findUser(id: number): string {
    if (id === 0) throw new Error("User not available");

    return "martin";
  }

  async generateToken(email: string, role: string[]): Promise<string> {
    const payload = { email: email, role: role };

    return this.jwtService.sign(payload, { expiresIn: '24h', secret: process.env['JWT_SECRET'] });
  }

  async validateToken(token: string): Promise<boolean> {
    const isValidToken = await this.jwtService.verify(token, { secret: process.env['JWT_SECRET'] });

    return !!isValidToken;
  }

  async extractRolesFromToken(token: string): Promise<string[]> {
    const userToken = await this.jwtService.verify(token, { secret: process.env['JWT_SECRET'] });

    return userToken.role;
  }
}
