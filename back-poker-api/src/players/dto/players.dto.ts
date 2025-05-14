import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import { Card } from 'src/tables/entities/card.entity';

export class PlayerDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ default: 1000 })
  @IsNumber()
  @IsNotEmpty()
  money: number = 1000;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  isAI: boolean = false;

  @ApiProperty({ type: [Card] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Card)
  hand: Card[] = [];

  @ApiProperty({ default: 0 })
  @IsNumber()
  bet: number = 0;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  table: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  constructor(partial: Partial<PlayerDto>) {
    Object.assign(this, partial);
  }
}
