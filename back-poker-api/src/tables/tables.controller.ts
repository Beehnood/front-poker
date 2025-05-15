import { Body, Controller, Get, Param, Post, Request } from '@nestjs/common';
import { TablesService } from './tables.service';
import { FilterPlayerHandInterceptor } from 'src/player-interceptor/player-interceptor.interceptor';
import { UseInterceptors } from '@nestjs/common';
import { ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('tables')
@UseInterceptors(FilterPlayerHandInterceptor)
@ApiResponse({
  status: 201,
  description: 'The record has been successfully created.',
})
@ApiResponse({ status: 403, description: 'Forbidden.' })
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get('')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  findOne(@Param('id') id: string) {
    return this.tablesService.findOne(+id);
  }

  @Get(':id/join')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  join(
    @Param('id') tableId: number,
    @Request() req: { player?: { sub?: number } },
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    const playerId: number = req.player.sub;
    return this.tablesService.join(tableId, playerId);
  }

  @Post(':id/join')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  joinPost(
    @Param('id') id: string,
    @Request() req: { player?: { sub?: number } },
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    const playerId: number = req.player.sub;
    return this.tablesService.join(+id, playerId);
  }

  @Get(':id/leave')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  leave(
    @Param('id') tableId: number,
    @Request() req: { player?: { sub?: number } },
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    const playerId: number = req.player.sub;
    return this.tablesService.leave(tableId, playerId);
  }

  @Get(':id/actions')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  actions(
    @Param('id') tableId: number,
    @Request() req: { player?: { sub?: number } },
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    // Replace with a valid method or implement actions in TablesService
    // You may want to provide a default action or throw an error if action is not provided
    throw new Error('Action must be specified');
    // Example: return this.tablesService.processHumanMove(tableId, req.player.sub, 'call');
  }

  @Post(':id/actions')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  action(
    @Request() req: { player?: { sub?: number } },
    @Param('id') tableId: number,
    @Body('action') action: string,
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    const playerId: number = req.player.sub;
    return this.tablesService.processHumanMove(tableId, playerId, action);
    // return this.tablesService.actions(tableId, playerId, action);
  }

  @Get(':id/actions/:action/:amount')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  actionWithAmount(
    @Request() req: { player?: { sub?: number } },
    @Param('id') tableId: number,
    @Param('action') action: string,
    @Param('amount') amount?: string,
  ) {
    if (
      !req ||
      typeof req !== 'object' ||
      !req.player ||
      typeof req.player.sub !== 'number'
    ) {
      throw new Error(
        'Invalid request: player information missing or malformed',
      );
    }
    const playerId = req.player.sub;
    const parsedAmount = amount ? Number(amount) : undefined;
    return this.tablesService.processHumanMove(
      tableId,
      playerId,
      action,
      parsedAmount,
    );
    // return this.tablesService.actions(tableId, playerId, action);
  }

  @Get(':id/actions/:action')
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  act(
    @Param('id') tableId: number,
    @Param('action') action: string,
    @Request() req: { player?: { sub?: number } },
  ) {
    const playerId = req.player?.sub;
    if (typeof playerId !== 'number') {
      throw new Error('Invalid player id');
    }
    return this.tablesService.processHumanMove(tableId, playerId, action);
    // return this.tablesService.actions(tableId, playerId, action);
  }
}
