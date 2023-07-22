import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 버티컬_마우스가_필요해 = new EventInstance(
  (game) =>
    !game.property.eventData['버티컬 마우스가 필요해'].has &&
    game.property.turn > 10 &&
    WeekDay(2, 4)(game),
  '버티컬 마우스가 필요해',
  '손목이 아파서 새 마우스를 사고 싶다.',
  [
    new OptionInstance(
      (game) => game.player.property.money >= 1,
      '사자.',
      `돈이 1 감소한다.`,
      (game) => {
        game.player.property.money -= 1;
        game.property.eventData['버티컬 마우스가 필요해'] = { has: true };
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '사지 말자.',
      `체력이 1 감소한다.`,
      (game) => {
        // assert by condition but just for type safety
        if (!game.property.eventData['버티컬 마우스가 필요해'].has) {
          game.player.property.health = Math.max(
            game.player.property.health - 1,
            0,
          );
        }
        return true;
      },
    ),
  ],
);
