import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PlayerDocument } from './player.schema';
import { Table } from 'src/tables/entities/table.entity'; // 👈 Corrigé : bonne Table
import { PlayerDto } from 'src/players/dto/players.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel('Player') private playerModel: Model<PlayerDocument>,
    private jwtService: JwtService,
  ) {}

  async create(owner: { username: string; password: string, email: string }) {
    const existingUser = await this.playerModel.findOne({
      username: owner.username,
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(owner.password, salt);

    const newUser = new this.playerModel({

      id: 42, 
      email: owner.email,
      username: owner.username,
      password: hashedPassword,
      state: '',
      money: 1000,
    });

    const savedUser: PlayerDocument = await newUser.save();
    if (!savedUser) throw new BadRequestException('User creation failed');

    const payload: { name: string; sub: number | string } = {
      name: savedUser.username,
      sub: savedUser.id as number | string,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };  
  }

  async findAll() {
    return this.playerModel.find().exec();
  }

<<<<<<< HEAD
  async findByUsername(email: string) {
    return this.playerModel.findOne({ email }).exec();
=======
  async findByEmail(email: string) {
    return this.playerModel.findOne({ email }).exec();
  }
  async findByUsername(username: string) {
    return this.playerModel.findOne({ username }).exec();
>>>>>>> e76190f (commit simple)
  }
  async findOne(id: number | string) {
    return this.playerModel.findOne({ id }).exec();
  }

  getActions() {
    return [
      { name: 'fold', description: 'description fold' },
      { name: 'call', description: 'description call' },
      { name: 'raise', description: 'description raise' },
    ];
  }

  async setAction(name: string, id: number) {
    const player = await this.playerModel.findOne({ id });
    if (!player) {
      throw new BadRequestException('User not found');
    }
    player.state = name;
    await player.save(); // 👈 Ajouté pour persister le changement
  }

  async createAIPlayer(name: string, table: Table): Promise<PlayerDto> {
    let idExists = true;
    let newId: number = Math.floor(Math.random() * 1000);

    while (idExists) {
      const existsInDB = await this.playerModel.findOne({ id: newId });
      const existsInTable = table.players.find(
        (p: PlayerDto) => p.id === newId && p.isAI,
      );
      if (!existsInDB && !existsInTable) {
        idExists = false;
      } else {
        newId = Math.floor(Math.random() * 1000);
      }
    }

    return {
      id: newId,
      username: name,
      password: '', // AI players have no password
      email: '', // AI players have no email
      isAI: true,
      hand: [],
      bet: 0,
      money: 1000,
      state: '',
      table: table.name,
    };
  }

  async createPlayer(playerId: number): Promise<PlayerDto> {
    const playerData: PlayerDocument = (await this.playerModel.findOne({
      id: playerId,
      email: { $ne: '' }, // Assure-toi que l'email n'est pas vide
    })) as PlayerDocument;
    if (!playerData) throw new BadRequestException('Player not found');

    return {
      id: Number(playerData.id),
      email: playerData.email,
      username: playerData.username,
      password: playerData.password,
      money: playerData.money,
      isAI: false,
      hand: [],
      bet: 0,
      state: '',
      table: '', // Tu peux remplir ce champ selon ta logique
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
    await this.playerModel.updateOne(
      { id: playerId },
      { $set: { money: newAmount } },
    );
  }

  resetPlayer(player: PlayerDto) {
    player.hand = [];
    player.state = '';
    player.table = ''; // 👈 Assure-toi que la propriété est cohérente avec ton modèle
    player.bet = 0;
    return player;
  }
}
