import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CommonFunctionsService } from '../common/common-functions.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ApiResponse, LoginResponse } from '../common/common.types';
import { INVALID_LOGIN_CREDENTIAL, USERNAME_ALREADY_TAKEN } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private commonFunctionService: CommonFunctionsService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<ApiResponse<User>> {
    try {
      const { username, password } = registerUserDto;
      const id = this.commonFunctionService.generateUniqueIntegerId();
      const hashedPassword =
        await this.commonFunctionService.encryptPassword(password);
      const newUser = this.usersRepository.create({
        id,
        username,
        password: hashedPassword,
      });
      const auth = await this.usersRepository.save(newUser);
      auth.password = undefined;
      return this.commonFunctionService.createdResponse(auth);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(USERNAME_ALREADY_TAKEN);
      }
      throw new InternalServerErrorException();
    }
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<LoginResponse>> {
    const { username, password } = loginDto;
    const user = await this.usersRepository.findOneBy({ username });
    if (!user) {
      throw new UnauthorizedException(INVALID_LOGIN_CREDENTIAL);
    }
    const isMatched = await this.commonFunctionService.decryptPassword(
      password,
      user.password,
    );
    if (!isMatched) {
      throw new UnauthorizedException(INVALID_LOGIN_CREDENTIAL);
    }
    user.password = undefined;
    const payload = { sub: user.id, username };
    const accessToken: string = await this.jwtService.sign(payload);
    return this.commonFunctionService.successResponse({ user, accessToken });
  }
}
