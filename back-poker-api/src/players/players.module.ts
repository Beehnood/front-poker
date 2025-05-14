import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from './player.schema'; // ← adapte si besoin

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Player.name, schema: PlayerSchema }]),
    PlayersModule,
  ],
  controllers: [PlayersController],
  providers: [PlayersService],
  exports: [MongooseModule, PlayersService],
})
export class PlayersModule {}
