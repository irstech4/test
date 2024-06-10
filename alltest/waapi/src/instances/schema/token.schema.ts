import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserTokenDocument = UserToken & Document;

@Schema({ timestamps: true })
export class UserToken {
  @Prop({type: String, required: true, unique: true})
  userId: string;

  @Prop({ type: String, required: true, unique: true })
  token: string;

  @Prop({ type: [Types.ObjectId], ref: 'Instance' })
  clientIds: Types.ObjectId[];
}

export const UserTokenSchema = SchemaFactory.createForClass(UserToken);                                                                                                                                               
