import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';
import { PlayersService } from 'src/players/players.service';
import { PlayerSubscriptionDTO } from 'src/players/dto/players.dto';
import { ApiBearerAuth, ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('Auth') // Groupe Swagger
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private playerService: PlayersService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signIn')
  @ApiBody({ type: PlayerSubscriptionDTO })
  @ApiResponse({ status: 200, description: 'Successfully signed in' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async signIn(@Body() player: PlayerSubscriptionDTO) {
    return this.authService.signIn({
      email: player.email,
      password: player.password,
    });
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signUp')
  @ApiBody({ type: PlayerSubscriptionDTO })
  @ApiResponse({ status: 201, description: 'Player created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async signUp(@Body() player: PlayerSubscriptionDTO) {
    // Vérification de l'existence de l'utilisateur
    return this.playerService.create({
      username: player.username,
      password: player.password,
      email: player.email,
    });
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Authenticated user profile' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  getProfile(@Request() req: { player: { userId: string | number } }) {
    return this.playerService.findOne(req.player.userId);
  }
}
