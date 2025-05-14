import { Module } from '@nestjs/common';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { PlayersService } from 'src/players/players.service';
import { DeckService } from 'src/deck/deck.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Player, PlayerSchema } from 'src/players/player.schema';
import { PlayersModule } from 'src/players/players.module';
import { Table } from 'typeorm';
import { TableSchema } from './table.shema';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Table.name, schema: TableSchema }]), PlayersModule],
  controllers: [TablesController],
  providers: [TablesService, DeckService, PlayersService],
  exports: [TablesService],
})
export class TablesModule { }
