import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Table, TableDocument } from './table.shema';
import { Player, PlayerDocument } from 'src/players/player.schema';

import { DeckService } from 'src/deck/deck.service';
import { PlayersService } from 'src/players/players.service';

import { TableDto } from './dto/table.dto';
import { PlayerDto } from 'src/players/dto/players.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class TablesService {
  private tables: TableDto[] = [];
  private readonly MAX_ROUNDS = 4;

  constructor(
    @InjectModel(Table.name) private readonly tableModel: Model<TableDocument>,
    @InjectModel(Player.name)
    private readonly playerModel: Model<PlayerDocument>,
    private readonly deckService: DeckService,
    private readonly playersService: PlayersService,
  ) {
    this.initializeTables();
  }

  private async initializeTables() {
    for (let i = 0; i < 4; i++) {
      const name = `Table ${i + 1}`;
      await this.createTable(name);
    }
  }

  async createTable(table_name: string): Promise<TableDto> {
    const newTable = new TableDto(this.tables.length);
    newTable.name = table_name;
    newTable.deck = this.deckService.shuffle(
      this.deckService.generateDeck(),
    ) as unknown as string[];

    const created = new this.tableModel(newTable);
    await created.save();

    this.tables.push(newTable);
    return newTable;
  }

  findAll(): TableDto[] {
    return this.tables;
  }

  findOne(id: number): TableDto {
    const table = this.tables.find((t) => t.id === id);
    if (!table) {
      throw new NotFoundException(`Table ${id} not found`);
    }
    return table;
  }

  async join(tableId: number, playerId: number): Promise<TableDto> {
    const table = this.findOne(tableId);
    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }
    const player: PlayerDto = await this.playersService.createPlayer(playerId);
    if (!player) {
      throw new NotFoundException(`Player ${playerId} not found`);
    }

    if (player.money < 10) {
      throw new Error('Not enough money');
    }

    if (table.players.some((p) => p.id === playerId)) {
      throw new Error(`You are already in the table ${tableId}`);
    }

    table.players.push(player);
    this.startGame(tableId);

    return table;
  }

  startGame(tableId: number): void {
    const table = this.findOne(tableId);
    if (!table) return;

    if (table.players.length < 2) {
      return; // Pas assez de joueurs pour commencer
    }

    const shuffledDeck: { cards: Card[] } = this.deckService.shuffle(
      this.deckService.generateDeck(),
    );
    table.deck = shuffledDeck.cards.map((card) => JSON.stringify(card));
    table.river = [];
    table.pot = 0;
    table.currentBet = 0;
    table.currentPlayerIndex = 0;
    table.currentRound = 1;

    for (const player of table.players) {
      player.hand = [
        JSON.parse(table.deck.pop() as string) as Card,
        JSON.parse(table.deck.pop() as string) as Card,
      ];
      player.bet = 0;
      player.state = 'playing';
    }

    table.dealerIndex = Math.floor(Math.random() * table.players.length);
  }

  leave(tableId: number, playerId: number): void {
    const table = this.findOne(tableId);
    if (!table) return;

    const index = table.players.findIndex((p) => p.id === playerId);
    if (index >= 0) {
      table.players.splice(index, 1);
    }
  }
  processHumanMove(
    tableId: number,
    playerId: number,
    action: string,
    amount?: number,
  ): string {
    const table = this.findOne(tableId);
    if (!table) {
      throw new NotFoundException(`Table ${tableId} not found`);
    }

    const player = table.players.find((p) => p.id === playerId);
    if (!player) {
      throw new NotFoundException(
        `Player ${playerId} not found in table ${tableId}`,
      );
    }

    if (player.state !== 'playing') {
      throw new BadRequestException(
        `Player ${playerId} is not in a valid state to act`,
      );
    }

    switch (action) {
      case 'fold':
        player.state = 'folded';
        break;

      case 'call': {
        const callAmount = table.currentBet - player.bet;
        if (player.money < callAmount) {
          throw new BadRequestException('Not enough money to call');
        }
        player.money -= callAmount;
        player.bet += callAmount;
        table.pot += callAmount;
        break;
      }

      case 'raise': {
        if (amount === undefined || amount <= 0) {
          throw new BadRequestException('Invalid raise amount');
        }
        const totalBet = table.currentBet + amount;
        const raiseAmount = totalBet - player.bet;
        if (player.money < raiseAmount) {
          throw new BadRequestException('Not enough money to raise');
        }
        player.money -= raiseAmount;
        player.bet += raiseAmount;
        table.pot += raiseAmount;
        table.currentBet = player.bet;
        break;
      }

      default:
        throw new BadRequestException(`Invalid action: ${action}`);
    }

    player.state = 'played';

    // Passer au joueur suivant
    table.currentPlayerIndex =
      (table.currentPlayerIndex + 1) % table.players.length;

    return `Player ${playerId} performed ${action}`;
  }
}
