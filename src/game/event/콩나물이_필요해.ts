import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 콩나물이_필요해 = new EventInstance(
  (game) =>
    !game.property.eventData['콩나물이 필요해'].has && WeekDay(2, 4)(game),
  '콩나물이 필요해',
  '개발만 하니 머리가 아프다.\n노래를 들으면서 하면 더 오래 할 수 있을 것 같다.',
  [
    new OptionInstance(
      (game) => game.player.property.money >= 1,
      '사자.',
      `돈이 1 감소하고 기본 체력이 1 증가한다.`,
      (game) => {
        game.player.property.money -= 1;
        game.property.eventData['콩나물이 필요해'].has = true;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '사지 말자.',
      `아무 일도 일어나지 않는다.`,
      (game) => {
        game.property.eventData['콩나물이 필요해'].has = false;
        return true;
      },
    ),
  ],
);
