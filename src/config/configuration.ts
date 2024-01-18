import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';

export const databaseConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_DATABASE'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    autoLoadEntities: true,
    synchronize: true,
  }),
  inject: [ConfigService],
};
