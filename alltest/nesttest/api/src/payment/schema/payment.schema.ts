import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PaymentDocument = HydratedDocument<Payment>;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ type: String, required: true})
  userId: string;

  @Prop({ type:String,required: true,unique:true })
  paymentId: string;

  @Prop({type:String})
  orderId:string

  @Prop({ required: true })
  transactionSignature: string;

  @Prop({ type: String })
  transactionAmount: string;

  @Prop({ type: String, })
  transactionStatus: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
