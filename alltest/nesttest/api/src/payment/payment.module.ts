import { Module } from '@nestjs/common';
import { PaymentsService } from './payment.service';
import { PaymentsController } from './payment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/payment.schema';
import { Plans, PlansSchema } from 'src/plan/schema/plan.schema';
import { Instance, InstanceSchema } from 'src/instances/schema/instance.schema';
import { InstancesService } from 'src/instances/instances.service';
import { InstancesModule } from 'src/instances/instances.module';
import { UserToken, UserTokenSchema } from 'src/instances/schema/token.schema';
import { User, UserSchema } from 'src/auth/schema/auth.shcema';
import { JwtService } from '@nestjs/jwt';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
      { name: Plans.name, schema: PlansSchema },
      { name: Instance.name, schema: InstanceSchema },
      { name: UserToken.name, schema: UserTokenSchema },
      { name: User.name, schema: UserSchema },
    ]),
    InstancesModule,HttpModule
  ],
  providers: [PaymentsService, InstancesService, JwtService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
