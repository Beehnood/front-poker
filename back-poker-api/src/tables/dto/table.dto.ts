import { PlayerDto } from 'src/players/dto/players.dto';

export class TableDto {
  id: number;
  deck: string[];
  river: string[];
  pot: number;
  name: string;
  currentBet: number;
  currentRound: number;
  currentPlayerIndex: number;
  dealerIndex: number;
  players: PlayerDto[];
  newTable: import('/Users/behnoodpazhang/Desktop/B3/App-web/back-poker-api/src/tables/entities/deck.entity').Deck;

  constructor(id: number) {
    this.id = id;
    this.deck = [];
    this.river = [];
    this.pot = 0;
    this.currentBet = 0;
    this.currentRound = 0;
    this.currentPlayerIndex = 0;
    this.dealerIndex = 0;
    this.players = [];
  }
}
