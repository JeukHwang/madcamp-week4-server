import { GameConstant } from '../logic/constant';
import { EventInstance, NoCondition, OptionInstance } from '../logic/event';
import { countArray } from '../logic/util';

export const 불이야 = new EventInstance(
  (game) => game.property.turn > 7,
  '불이야!',
  '건물에 작은 불이 났으니 대피하자!',
  [
    new OptionInstance(
      NoCondition,
      '그래도 커밋은 해야지~',
      `체력이 1 감소한다.`,
      (game) => {
        game.player.property.health = Math.max(
          game.player.property.health - 1,
          0,
        );
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '어서 도망가자.',
      `방금 얻은 경험치를 잃는다.`,
      (game) => {
        // inverse of updateExperience in game.ts
        const collectedTile = game.property.eventData['불이야!'].data;
        countArray(collectedTile).forEach(({ name, count }) => {
          game.player.property.experience[name] = Math.max(
            game.player.property.experience[name] -
              Math.floor(count / GameConstant.experienceThreshold),
            0,
          );
        });
        return true;
      },
    ),
  ],
);
