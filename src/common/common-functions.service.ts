import { HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CommonFunctionsService {
  generateUniqueIntegerId(): number {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * Math.pow(10, 10))
      .toString()
      .padStart(10, '0');
    const idString = `${timestamp}${randomPart}`.substr(0, 18);
    return parseInt(idString);
  }

  async encryptPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    return bcrypt.hash(password, salt);
  }

  decryptPassword(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  successResponse<T>(
    data: T,
    statusCode: number = HttpStatus.OK,
  ): { statusCode: number; status: string; data: T } {
    return {
      statusCode,
      status: 'Success',
      data,
    };
  }

  createdResponse<T>(
    data: T,
    statusCode: number = HttpStatus.CREATED,
  ): { statusCode: number; status: string; data: T } {
    return {
      statusCode,
      status: 'Created',
      data,
    };
  }
}
