import { ApiProperty } from '@nestjs/swagger';

export class Card {
  @ApiProperty()
  suit: string;

  @ApiProperty()
  rank: string;

  constructor(rank: string, suit: string) {
    this.rank = rank;
    this.suit = suit;
  }
}
