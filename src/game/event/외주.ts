import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 웹사이트_개발_외주 = new EventInstance(
  (game) => WeekDay(2, 4)(game),
  '웹사이트 개발 외주',
  '웹사이트 개발을 요청한 고객이 있다. 수락할까?',
  [
    new OptionInstance(
      (game) =>
        game.player.property.level['JavaScript'] >= 3 &&
        game.player.property.levelEnabled['JavaScript'] &&
        game.player.property.health >= 1,
      'JavaScript 3년차 이상 개발자로서 수락하자.',
      `체력이 1 감소하고 돈이 2 증가한다.`,
      (game) => {
        const prop = game.player.property;
        if (prop.health < 1) {
          return false;
        }
        prop.health -= 1;
        prop.money += 2;
        return true;
      },
    ),
    new OptionInstance(
      (game) =>
        game.player.property.level['JavaScript'] >= 1 &&
        game.player.property.levelEnabled['JavaScript'] &&
        game.player.property.health >= 2,
      'JavaScript 1년차 이상 개발자로서 수락하자.',
      `체력이 2 감소하고 돈이 1 증가한다.`,
      (game) => {
        const prop = game.player.property;
        if (prop.health < 2) {
          return false;
        }
        prop.health -= 2;
        prop.money += 1;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '거절하자.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);

export const 데이터_시각화_외주 = new EventInstance(
  (game) => WeekDay(2, 4)(game),
  '데이터 시각화 외주',
  '데이터 시각화를 요청한 고객이 있다. 수락할까?',
  [
    new OptionInstance(
      (game) =>
        game.player.property.level['Python'] >= 2 &&
        game.player.property.levelEnabled['Python'] &&
        game.player.property.health >= 1,
      'Python 2년차 이상 개발자로서 수락하자.',
      `체력이 1 감소하고 돈이 2 증가한다.`,
      (game) => {
        const prop = game.player.property;
        if (prop.health < 1) {
          return false;
        }
        prop.health -= 1;
        prop.money += 2;
        return true;
      },
    ),
    new OptionInstance(
      (game) =>
        game.player.property.level['Python'] >= 1 &&
        game.player.property.levelEnabled['Python'] &&
        game.player.property.health >= 2,
      'Python 1년차 이상 개발자로서 수락하자.',
      `체력이 2 감소하고 돈이 2 증가한다.`,
      (game) => {
        const prop = game.player.property;
        if (prop.health < 2) {
          return false;
        }
        prop.health -= 2;
        prop.money += 2;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '거절하자.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);
