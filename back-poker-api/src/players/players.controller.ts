import { Controller, Get, Param, Request } from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Controller('player')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // Uncomment the following if you implement findByUsername in PlayersService
  // @Get('username/:username')
  // findByUsername(@Param('username') username: string) {
  //   return this.playersService.findByUsername(username);
  // }

  @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    return this.playersService.findByEmail(email);
  }

  @Get('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll(@Request() req: { player: { sub: string } }) {
    const player = req.player;
    return this.playersService.findOne(player.sub);
  }

  @Get('motherlode')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  motherlode(@Request() req: { player: { sub: string } }) {
    const player = req.player;
    return this.playersService.motherlode(Number(player.sub));
  }
}
