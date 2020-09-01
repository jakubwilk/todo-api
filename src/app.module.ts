import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Connection } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './models/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env['DATABASE_HOST'],
      port: parseInt(process.env['DATABASE_PORT']),
      username: process.env['DATABASE_USER'],
      password: process.env['DATABASE_PASSWORD'],
      database: process.env['DATABASE_NAME'],
      entities: [User],
      synchronize: false,
      migrations: ['src/migrations/**/*.js'],
      cli: {
        migrationsDir: 'src/migrations'
      }
    }),
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
