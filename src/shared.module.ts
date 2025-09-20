import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { HelperService } from './helper/helper.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
     ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET', 'xxxxxx'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPRIE', '1d'),
        },
      }),
      inject:[ConfigService]
    }),
  ],
  providers: [PrismaService, HelperService, ConfigService],
  exports: [PrismaService, HelperService, ConfigService,JwtModule],
})
export class SharedModule {}
