import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type UserDocument = HydratedDocument<User>;


interface ClientDetails {
  clientId: string;
  expiryDate: Date;
  createDate: Date;
  status: string;
  userId: string;
}


@Schema({ timestamps: true })
export class User {
  @Prop({ type: String, required: true, unique: true })
  userId: string;

  @Prop({ required: true })
  name: string;

  @Prop({
    required: [true],
    unique: [true, 'Email is already available'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String })
  contactNo: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  CouponCode: boolean;

  @Prop({ type: Types.ObjectId, ref: 'Payment' })
  payments: Types.ObjectId;

  @Prop({ type: Array })
  instanceIDs: [];

  @Prop({ type: String, unique: true })
  token: string;

  @Prop([
    {
      SKU: { type: String },
      productName: { type: String },
      Qty: { type: Number },
    },
  ])
  clientIds: ClientDetails[];
}
export const UserSchema = SchemaFactory.createForClass(User);
