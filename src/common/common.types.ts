import { HttpStatus } from '@nestjs/common';

export type ApiResponse<T> = {
  statusCode: number;
  status: string;
  data: T;
};

export function successResponse<T>(
  data: T,
  statusCode: number = HttpStatus.OK,
): { statusCode: number; status: string; data: T } {
  return {
    statusCode,
    status: 'Success',
    data,
  };
}

export function createdResponse<T>(
  data: T,
  statusCode: number = HttpStatus.CREATED,
): { statusCode: number; status: string; data: T } {
  return {
    statusCode,
    status: 'Created',
    data,
  };
}
