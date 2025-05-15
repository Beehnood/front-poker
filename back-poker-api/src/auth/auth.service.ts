import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PlayersService } from 'src/players/players.service';
import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private playerService: PlayersService,
    private jwtService: JwtService,
  ) {}

  async signIn(player: {
    email: string;
    password: string;
  }): Promise<{ access_token: string }> {
    const user = await this.playerService.findByUsername(player.email);
    if (user == undefined) {
      throw new BadRequestException('User not found');
    }
    if (await bcrypt.compare(player.password, user.password)) {
      const payload: { name: string; userId: string } = {
        name: player.email,
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
