import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DeckService } from './deck/deck.service';

@Module({
  imports: [
    MongooseModule.forRoot(''), // remplace par ton URI MongoDB
    PlayersModule,
    TablesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DeckService],
})
export class AppModule {}
