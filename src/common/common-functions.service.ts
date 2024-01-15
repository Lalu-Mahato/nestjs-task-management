import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommonFunctionsService {
  generateUniqueIntegerId(): number {
    const timestamp = Date.now();
    const randomPart = Math.floor(Math.random() * 1000);
    return parseInt(`${timestamp}${randomPart}`);
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
