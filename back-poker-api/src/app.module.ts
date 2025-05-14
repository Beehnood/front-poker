import { Module, Injectable } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TablesModule } from './tables/tables.module';
import { PlayersModule } from './players/players.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { DeckService } from './deck/deck.service';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {
    const dbUri = this.configService.get<string>('MONGODB_URI');
    console.log('MongoDB URI:', dbUri);
  }
}
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // Utilise ConfigService pour charger dynamiquement l'URI
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService): { uri: string } => {
        const uri = configService.get<string>('MONGODB_URI');
        if (!uri) {
          throw new Error(
            'MONGODB_URI is not defined in environment variables',
          );
        }
        return { uri };
      },
      inject: [ConfigService],
    }),

    PlayersModule,
    TablesModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, DeckService],
})
export class AppModule {}
