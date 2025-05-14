import { Exclude } from 'class-transformer';
import { Deck } from 'src/tables/entities/deck.entity';
import { Card } from './card.entity';
import { PlayerDto } from 'src/players/dto/players.dto';

export class Table {
  id: number;
  name: string;
  @Exclude()
  deck: Deck;
  players: PlayerDto[] = [];
  river: Card[] = [];
  pot: number = 0;
  currentBet: number = 0;
  currentTurn: number = 0;
  round: number = 0;
  currentRound: number = 0;
  currentPlayerIndex: number = 0;
  dealerIndex: number = 0;

  constructor(id: number) {
    this.id = id;
    this.name = `Table ${id}`;
    this.deck = new Deck();
  }
}
