import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Card } from 'src/tables/entities/card.entity';
import { Player } from 'src/entities/player.entity';
import { ApiProperty } from '@nestjs/swagger';




export class PlayerDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    username: string;

    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty()
    // @IsString()
    // @IsNotEmpty()
    // password: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    money: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    state: string;

    @IsString()
    @ApiProperty()
    hand?: Card[];

    constructor(partial: Partial<PlayerDto>) {
        Object.assign(this, partial);
    }


}