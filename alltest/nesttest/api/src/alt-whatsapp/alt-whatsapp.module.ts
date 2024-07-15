import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AltWhatsappService } from './alt-whatsapp.service';
import { AltWhatsappController } from './alt-whatsapp.controller';
import { Instance, InstanceSchema } from 'src/instances/schema/instance.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name:Instance.name,schema:InstanceSchema}]),
  ],
  controllers: [AltWhatsappController],
  providers: [AltWhatsappService],
})
export class AltWhatsappModule {}
