import { Injectable, NotFoundException } from '@nestjs/common';
import { Table } from './entities/table.entity';
import { DeckService } from 'src/deck/deck.service';
import { PlayersService } from 'src/players/players.service';
import { PlayerDto } from 'src/players/dto/players.dto';

@Injectable()
export class TablesService {
  tables: Table[] = [];
  MAX_ROUNDS = 4;

  constructor(
    private deckService: DeckService,
    private playersService: PlayersService,
  ) {
    for (let i = 0; i < 4; i++) {
      this.createTable();
    }
  }

  createTable() {
    let table = new Table(this.tables.length);
    table.deck = this.deckService.shuffle(this.deckService.generateDeck());
    table.currentRound = 0;
    this.tables.push(table);
  }

  findAll() {
    return this.tables;
  }

  findOne(id: number) {
    return this.tables[id];
  }

  async join(tableId: number, playerId: number) {
    if (!this.tables[tableId]) {
      return `Table ${tableId} not found`;
    }
    let player = await this.playersService.createPlayer(playerId);
    if (!player) return 'Player not found';
    if (player.money < 10) return 'Not enough money';
    if (this.tables[tableId].players.some((p) => p.id === playerId)) {
      return `You are already in the table ${tableId}`;
    }

    this.tables[tableId].players.push(player);
    await this.startGame(tableId, playerId);
    return this.formatResponse(tableId, playerId);
  }

  async actions(tableId: number, playerId: number, action: string, amount?: number) {
    const table = this.tables[tableId];
    if (!table) return `Table ${tableId} not found`;

    const player = table.players.find((p) => p.id === playerId);
    if (!player) return `Player ${playerId} not found`;

    console.log(`joueur ${player.username} action ${action} amount ${amount}`);

    switch (action) {
      case 'fold':
        return await this.fold(tableId, playerId);
      case 'call':
        return await this.call(tableId, playerId);
      case 'raise':
        return await this.raise(tableId, playerId, amount);
      case 'check':
        return await this.check(tableId, playerId);
      case 'leave':
        return this.leave(tableId, playerId);
      case 'startGame':
        return this.startGame(tableId, playerId);
      case 'small_blind':
        return this.blinds(tableId, playerId, 5);
      case 'big_blind':
        return this.blinds(tableId, playerId, 10);
      default:
        return { message: 'Action not found', possibleActions: [] };
    }
  }

  async blinds(tableId: number, playerId: number, amount: number) {
    const table = this.tables[tableId];
    const player = table.players.find((p) => p.id === playerId);
    if (!player) return `Player ${playerId} not found`;
    if (player.money < amount) return 'Not enough money';

    player.bet = amount;
    player.money -= amount;
    player.state = "waiting";

    if (!player.isAI) {
      await this.playersService.updateMoney(playerId, player.money);
    }

    table.currentBet = amount;
    table.pot += amount;
    return this.formatResponse(tableId, playerId);
  }

  async fold(tableId: number, playerId: number) {
    const table = this.tables[tableId];
    const player = table.players.find(p => p.id === playerId);
    if (!player) throw new NotFoundException(`Player ${playerId} not found at table ${tableId}`);

    player.state = 'fold';
    const endMsg = this.checkGameEnd(tableId);
    if (endMsg) return endMsg;
    return this.formatResponse(tableId, playerId);
  }

  async call(tableId: number, playerId: number) {
    const table = this.tables[tableId];
    const player = table.players.find(p => p.id === playerId);
    if (!player) return `Player ${playerId} not found`;

    let diff = table.currentBet - player.bet;
    if (player.money < diff) return 'Not enough money';

    player.money -= diff;
    player.bet = table.currentBet;
    player.state = "waiting";

    if (!player.isAI) {
      await this.playersService.updateMoney(playerId, player.money);
    }

    table.pot += diff;
    const endMsg = this.checkGameEnd(tableId);
    if (endMsg) return endMsg;
    return this.formatResponse(tableId, playerId);
  }

  async raise(tableId: number, playerId: number, amount: number = 0) {
    const table = this.tables[tableId];
    const player = table.players.find(p => p.id === playerId);
    if (!player) return `Player ${playerId} not found`;

    let diff = amount - player.bet;
    if (player.money < diff) return 'Not enough money';

    player.money -= diff;
    player.bet = amount;
    player.state = "waiting";

    if (!player.isAI) {
      await this.playersService.updateMoney(playerId, player.money);
    }

    table.pot += diff;
    table.currentBet = amount;
    const endMsg = this.checkGameEnd(tableId);
    if (endMsg) return endMsg;
    return this.formatResponse(tableId, playerId);
  }

  check(tableId: number, playerId: number) {
    return this.formatResponse(tableId, playerId);
  }

  leave(tableId: number, playerId: number) {
    const table = this.tables[tableId];
    table.players = table.players.filter(p => p.id !== playerId);

    if (table.players.every(p => p.isAI)) {
      table.players = [];
    }

    this.resetTable(tableId);
    return this.tables;
  }

  async startGame(tableId: number, currentPlayerId: number) {
    const table = this.tables[tableId];
    table.currentRound = 0;
    await this.generateAI(tableId, currentPlayerId, 2);

    const players = table.players;
    const dealerPosition = Math.floor(Math.random() * players.length);
    players[dealerPosition].state = "dealer";
    table.dealerIndex = dealerPosition;

    players.forEach(player => {
      for (let i = 0; i < 2; i++) {
        const card = this.deckService.pickCard(table.deck);
        if (card) {
          player.hand.push(card);
        }
      }
    });

    this.assignBlinds(tableId);
    table.currentPlayerIndex = players.findIndex(p => p.state === "small_blind");

    this.playRound(tableId);
  }

  assignBlinds(tableId: number) {
    const table = this.tables[tableId];
    const players = table.players;
    const dealerIndex = players.findIndex(p => p.state === "dealer");

    const smallBlindIndex = (dealerIndex + 1) % players.length;
    const bigBlindIndex = (dealerIndex + 2) % players.length;

    players.forEach(player => player.state = "waiting");
    players[dealerIndex].state = "dealer";
    players[smallBlindIndex].state = "small_blind";
    players[bigBlindIndex].state = "big_blind";
  }

  resetTable(tableId: number) {
    const table = this.tables[tableId];
    table.players = [];
    table.deck = this.deckService.shuffle(this.deckService.generateDeck());
    table.river = [];
    table.pot = 0;
    table.currentBet = 0;
    table.currentRound = 0;
  }

  async generateAI(tableId: number, currentPlayerId: number, playersNumber: number) {
    for (let i = 0; i < playersNumber; i++) {
      const player = await this.playersService.createAIPlayer(`AI${i}`, this.tables[tableId]);
      this.tables[tableId].players.push(player);
    }
  }

  checkGameEnd(tableId: number): string | undefined {
    const table = this.tables[tableId];
    const activePlayers = table.players.filter(p => p.state !== "fold");
    if (activePlayers.length === 1) {
      const winner = activePlayers[0];
      const msg = `Everyone folded, player ${winner.username} wins ${table.pot}`;
      this.resetTable(tableId);
      return msg;
    }
    return;
  }

  private formatResponse(tableId: number, playerId: number) {
    const table = this.tables[tableId];
    return {
      table,
      possibleActions: this.getPossibleActions(table, playerId),
    };
  }

  private getPossibleActions(table: Table, playerId: number): string[] {
    const player = table.players.find(p => p.id === playerId);
    if (!player) return [];

    const actions: string[] = [];

    if (player.state === 'fold') return [];

    if (table.currentRound === 0 && (player.state === "small_blind" || player.state === "big_blind")) {
      actions.push(player.state);
      return actions;
    }

    if (player.bet < table.currentBet && player.money >= (table.currentBet - player.bet)) {
      actions.push("call");
    }

    if (player.bet === table.currentBet) {
      actions.push("check");
    }

    if (player.money > (table.currentBet - player.bet)) {
      actions.push("raise");
    }

    actions.push("fold", "leave");

    return actions;
  }

}
