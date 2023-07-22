import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { LoggerMiddleware } from 'src/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAccessGuard } from './auth/guard/jwt-access.guard';
import { GameModule } from './game/game.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [AuthModule, PrismaModule, UserModule, GameModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAccessGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
