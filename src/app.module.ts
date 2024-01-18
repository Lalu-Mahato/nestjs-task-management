import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './common/logger/logger.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configValidationSchema } from './config.schema';
import { databaseConfig } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      isGlobal: true,
      validationSchema: configValidationSchema,
    }),
    TypeOrmModule.forRootAsync(databaseConfig),
    TasksModule,
    AuthModule,
    LoggerModule,
  ],
})
export class AppModule {}
