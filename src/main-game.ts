import { findEventByName } from './game/event/events';
import { getIntegerFromInput, getPositionsFromInput } from './game/logic/cli';
import type { AppliableGameEvent } from './game/logic/event';
import type { ResponseInput } from './game/logic/game';
import { GameInstance } from './game/logic/game';
import { logAndPrint } from './game/logic/util';

async function playGameFromCLI() {
  let game: GameInstance = GameInstance.new();
  while (!game.property.isFinished) {
    while (true) {
      game.playStep();
      if (game.property.isFinished) {
        break;
      }
      const request = game.getRequest();
      let data: ResponseInput;
      switch (request.type) {
        case 'number':
          console.clear();
          game.show();
          const event = findEventByName(
            request.event.title,
          ) as AppliableGameEvent;
          event.show(game);
          data = {
            type: 'number',
            data: await getIntegerFromInput(request.min, request.max),
          };
          break;
        case 'positions':
          console.clear();
          game.show();
          data = {
            type: 'positions',
            data: await getPositionsFromInput(game),
          };
          break;
      }
      game = GameInstance.fromJson(game.toJson());
      game.setResponse(data);
    }
  }
  game.show();
  logAndPrint('개발자로 활동할 수 없게 되었습니다...');
}

playGameFromCLI();
