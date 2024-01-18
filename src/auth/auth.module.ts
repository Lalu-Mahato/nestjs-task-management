import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CommonFunctionsService } from '../common/common-functions.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECREY_KEY'),
        signOptions: {
          expiresIn: 3600, // 1 Hr
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CommonFunctionsService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
