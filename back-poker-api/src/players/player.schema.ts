import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Player extends Document {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop({ default: 0 })
  money: number;

  @Prop({ default: "" })
  state: string;

  @Prop({ default: false })
  isAI: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
