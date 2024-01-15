import { User } from 'src/auth/entities/user.entity';

export type ApiResponse<T> = {
  statusCode: number;
  status: string;
  data: T;
};

export type LoginResponse = {
  user: User;
  accessToken: string;
};
