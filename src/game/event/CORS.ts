import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const CORS = new EventInstance(
  (game) =>
    !game.property.eventData['CORS'].isDone &&
    game.property.turn > 4 &&
    WeekDay(2)(game),
  'CORS',
  '으아아아! CORS 에러가 났어요!',
  [
    new OptionInstance(
      NoCondition,
      '화가 치솟아오른다.',
      `JavaScript 경험치가 1 감소한다.`,
      (game) => {
        game.player.property.experience.JavaScript = Math.max(
          game.player.property.experience.JavaScript - 1,
          0,
        );
        game.property.eventData['CORS'].isDone = true;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      'CORS 따위 해결하면 되는 거 아냐?',
      `JavaScript 경험치가 감소하지 않는다.`,
      (game) => {
        game.property.status.unshift({ type: 'applyEvent', data: 'CORS 문제' });
        game.property.eventData['CORS'].isDone = true;
        return true;
      },
    ),
  ],
);

export const CORS_문제 = new EventInstance(
  NoCondition,
  'CORS 문제',
  'CORS 따위 해결하면 된다는 당신을 위해 준비한 특별한 문제!\n2020년 2월 이후 Chrome이 SameSite 속성의 기본값으로 사용하는 값은?',
  [
    new OptionInstance(
      NoCondition,
      'None',
      '정답이 아니면 JavaScript 경험치가 2 감소한다.',
      (game) => {
        game.player.property.experience.JavaScript = Math.max(
          game.player.property.experience.JavaScript - 2,
          0,
        );
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      'Strict',
      '정답이 아니면 JavaScript 경험치가 2 감소한다.',
      (game) => {
        game.player.property.experience.JavaScript = Math.max(
          game.player.property.experience.JavaScript - 2,
          0,
        );
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      'Lax',
      '정답이 아니면 JavaScript 경험치가 2 감소한다.',
      () => {
        return true;
      },
    ),
  ],
);
