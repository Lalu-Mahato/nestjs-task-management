import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponse, LoginResponse } from '../common/common.types';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(
    @Body() registerUserDto: RegisterUserDto,
  ): Promise<ApiResponse<User>> {
    return this.authService.register(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto): Promise<ApiResponse<LoginResponse>> {
    return this.authService.login(loginDto);
  }
}
