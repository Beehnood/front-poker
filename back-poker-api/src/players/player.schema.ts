import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player extends Document {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: 1000 })
  money: number;

  @Prop({ default: [] })
  hand: string[];

  @Prop({ default: 0 })
  bet: number;

  @Prop({ default: 'waiting' })
  state: string;

  @Prop({ default: false })
  isAI: boolean;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
