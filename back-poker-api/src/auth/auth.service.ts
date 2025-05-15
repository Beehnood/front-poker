import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from 'src/players/players.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private playerService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async signUp(player: { email: string; password: string }) {
    try {
      // Vérifie si l'email existe déjà
      const existingPlayer = await this.playerService.findByEmail(player.email);
      if (existingPlayer) {
        throw new BadRequestException('Email already exists');
      }

      // Hache le mot de passe
      const hashedPassword = await bcrypt.hash(player.password, 10);

      // Crée le nouveau joueur
      const newPlayer = (await this.playerService.create({
        username: player.email,
        password: hashedPassword,
      })) as { id?: string; _id?: string };

      return {
        message: 'Inscription réussie',
        playerId: newPlayer.id ?? newPlayer._id,
      };
    } catch (error: any) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        (error as { code?: number }).code === 11000
      ) {
        throw new BadRequestException('Email already exists');
      }
      throw error; // Relance les autres erreurs pour un traitement ultérieur
    }
  }

  async signIn(player: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.playerService.findByEmail(player.email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (await bcrypt.compare(player.password, user.password)) {
      const payload: { email: string; userId: string } = {
        email: player.email,
        userId: String(user.id),
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Invalid password');
    }
  }
}
