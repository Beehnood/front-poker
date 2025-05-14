import {  IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Deck } from '../entities/deck.entity';
import { Card } from '../entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from 'src/players/dto/players.dto';

export class CreateTableDto {

    @IsNumber()
    @ApiProperty()
    ID: number;

    @IsNotEmpty()
    @ApiProperty()
    deck: Deck = new Deck();

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ default: [], isArray: true})
    players: PlayerDto[] = [];

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({default: [], isArray: true})
    river: Card[] = [];

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    pot: number = 0;
}
