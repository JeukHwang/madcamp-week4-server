import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { LoggerMiddleware } from 'src/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocalGuard } from './auth/guard/local.guard';
import { GameModule } from './game/game.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, GameModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: LocalGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
