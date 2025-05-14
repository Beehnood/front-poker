import { PartialType } from '@nestjs/mapped-types';
import { CreateTableDto } from './create-table.dto';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';
import { Deck } from '../entities/deck.entity';
import { Card } from '../entities/card.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PlayerDto } from 'src/players/dto/players.dto';

export class UpdateTableDto extends PartialType(CreateTableDto) {

    @ApiProperty()
    @IsNotEmpty()
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

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    pot: number = 0;
   
}
