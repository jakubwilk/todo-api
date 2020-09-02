import {
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  LoginUserDto,
  RegisterUserDto,
} from '../dto/users.dto';
import { BaseMessage } from '../interfaces/base-message.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.entity';
import { Repository } from 'typeorm';
import * as argon2
  from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }

  async createAccount(userData: RegisterUserDto): Promise<BaseMessage> {
    const { login, password, repeat_password } = userData;

    const isUserExists = await this.usersRepository.findOne({ login: login });

    if (isUserExists) {
      throw new HttpException({ message: ['User with this address email already exists'], error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
    }

    if (password !== repeat_password) {
      throw new HttpException({ message: ['Passwords must be the same'], error: 'Bad Request' }, HttpStatus.BAD_REQUEST);
    }

    const user = new User();
    user.login = login;
    user.password = password;
    user.roles = 'user';
    user.blocked = false;

    const isUserCreated = await this.usersRepository.save(user);

    if (!isUserCreated) {
      throw new HttpException({ message: ['Server encountered a problem while creating a new user'], error: 'Internal Server Error' }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

    return {
      message: ['Account successfully created'],
      error: ''
    };
  }

  async loginUser(userData: LoginUserDto): Promise<string> {
    const { login, password } = userData;

    const userObject = await this.usersRepository.findOne({ login: login });
    if (!userObject) throw new HttpException({ message: ['User with that login was not found'], error: 'Bad Request' }, HttpStatus.BAD_REQUEST);

    const isValidPassword = await argon2.verify(userObject.password, password);
    if (!isValidPassword) throw new HttpException({ message: ['Incorrect password'], error: 'Bad Request' }, HttpStatus.BAD_REQUEST);

    return await this.generateToken(userObject.login, ['user']);
  }

  async generateToken(email: string, role: string[]): Promise<string> {
    const payload = { email: email, role: role };

    return this.jwtService.sign(payload, { expiresIn: '24h', secret: process.env['JWT_SECRET'] });
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      const isValidToken = await this.jwtService.verify(token, { secret: process.env['JWT_SECRET'] });
      return true;
    } catch (err) {
      return false
    }
  }

  async extractRolesFromToken(token: string): Promise<string[]> {
    const userToken = await this.jwtService.verify(token, { secret: process.env['JWT_SECRET'] });

    return userToken.role;
  }
}