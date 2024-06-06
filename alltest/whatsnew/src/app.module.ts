import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsService } from './products/products.service';
import { ProductsController } from './products/products.controller';
import { ProductsModule } from './products/products.module';
import { PlansModule } from './plans/plans.module';
import { PaymentsModule } from './payments/payments.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AltWhatsappModule } from './alt-whatsapp/alt-whatsapp.module';

@Module({
  imports: [
    // ScheduleModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const envType = configService.get('ENV');
        if (envType === 'Local') {
          // const uri = configService.get('DB_URL');
          // console.log('local');
          return {
            uri: 'mongodb://0.0.0.0:27017/DevRobot',
          };
        }
        const uri = configService.get('DB_Prod_URL');
        return {
          uri,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    ProductsModule,
    PlansModule,
    PaymentsModule,
    AltWhatsappModule,
  ],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule {}
