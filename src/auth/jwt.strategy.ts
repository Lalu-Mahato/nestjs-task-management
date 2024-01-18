import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECREY_KEY'),
    });
  }

  async validate(payload): Promise<User> {
    const { username } = payload;
    const user: User = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.username'])
      .where('user.username = :username', { username })
      .getOne();
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
