import { Module } from '@nestjs/common';
import { InstancesService } from './instances.service';
import { InstancesController } from './instances.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { TokenAuthGuard } from './guards/token-auth.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { Instance, InstanceSchema } from './schema/instance.schema';
import { UserToken, UserTokenSchema } from './schema/token.schema';
import { Plans, PlansSchema } from 'src/plan/schema/plan.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'public-jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn:'1y',
          },
        };
      },
    }),
    MongooseModule.forFeature([
      { name: Instance.name, schema: InstanceSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: Plans.name, schema: PlansSchema },
    ]),
  ],
  controllers: [InstancesController],
  providers: [InstancesService, JwtStrategy, TokenAuthGuard],
  exports: [ JwtStrategy, TokenAuthGuard],
})
export class InstancesModule {}
