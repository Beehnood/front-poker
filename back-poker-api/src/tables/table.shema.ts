// src/tables/schemas/table.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PlayerDto } from 'src/players/dto/players.dto';
import { Card } from './entities/card.entity';

export type TableDocument = Table & Document;

@Schema()
export class Table {
  @Prop({ required: true })
  name: string;

  @Prop({ type: [Object], default: [] })
  players: PlayerDto[]; // Tu peux préciser les sous-champs

  @Prop({ type: [Object], default: [] })
  deck: Card[];

  @Prop({ default: [] })
  river: Card[];

  @Prop({ default: 0 })
  pot: number;

  @Prop({ default: 0 })
  currentBet: number;

  @Prop({ default: 0 })
  currentTurn: number;

  @Prop({ default: 0 })
  round: number;

  @Prop({ default: 0 })
  currentRound: number;

  @Prop({ default: 0 })
  currentPlayerIndex: number;

  @Prop({ default: 0 })
  dealerIndex: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
