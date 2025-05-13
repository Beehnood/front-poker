import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Table } from 'src/tables/entities/table.entity';
import { PlayerDocument, Player } from './schemas/players.schema'; // 👈 ton modèle Mongoose

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
    private jwtService: JwtService
  ) {}

  async create(owner: any) {
    const existingUser = await this.playerModel.findOne({ username: owner.username });
    if (existingUser) {
      throw new BadRequestException("User already exists");
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(owner.password, salt);

    const newUser = new this.playerModel({
      username: owner.username,
      password: hashedPassword,
      state: '',
      money: 1000, // valeur initiale par défaut ?
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw new BadRequestException("User creation failed");

    const payload = { name: savedUser.username, sub: savedUser.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async findAll() {
    return this.playerModel.find().exec();
  }

  async findByUsername(username: string) {
    return this.playerModel.findOne({ username }).exec();
  }

  async findOne(id: number | string) {
    return this.playerModel.findOne({ id }).exec();
  }

  getActions() {
    return [
      { name: "fold", description: "description fold" },
      { name: "call", description: "description call" },
      { name: "raise", description: "description raise" },
    ];
  }

  async setAction(name: string, id: number) {
    const player = await this.playerModel.findOne({ id });
    if (!player) {
      throw new BadRequestException("User not found");
    }
    player.state = name;
    // ne pas sauvegarder ici car l'état est temporaire
  }

  async createAIPlayer(name: string, table: Table): Promise<any> {
    let idExists = true;
    let newId: number;

    while (idExists) {
      newId = Math.floor(Math.random() * 100);
      const existsInDB = await this.playerModel.findOne({ id: newId });
      const existsInTable = table.players.find(p => p.id === newId && p.isAI);
      if (!existsInDB && !existsInTable) {
        idExists = false;
      }
    }

    return {
      id: newId,
      username: name,
      isAI: true,
      hand: [],
      bet: 0,
      money: 1000,
      state: "",
    };
  }

  async createPlayer(playerId: number): Promise<any> {
    const playerData = await this.playerModel.findOne({ id: playerId });
    if (!playerData) throw new BadRequestException("Player not found");

    return {
      id: playerData.id,
      username: playerData.username,
      money: playerData.money,
      isAI: false,
      hand: [],
      bet: 0,
      state: "",
    };
  }

  async motherlode(playerId: number) {
    const player = await this.playerModel.findOne({ id: playerId });
    if (player) {
      player.money += 1000;
      return player.save();
    }
    return;
  }

  async updateMoney(playerId: number, newAmount: number) {
    await this.playerModel.updateOne({ id: playerId }, { $set: { money: newAmount } });
  }

  resetPlayer(player: any) {
    player.hand = [];
    player.state = "";
    player.tableId = undefined;
    player.bet = 0;
    return player;
  }
}
