import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const ChatGPT = new EventInstance(
  (game) =>
    game.property.eventData['ChatGPT'].leftDay === 0 && WeekDay(2, 4)(game),
  'ChatGPT',
  'ChatGPT는 모든 것을 알고 있다. 구독할까?\nChatGPT를 구독한 동안에는 경험치가 2배로 쌓인다.',
  [
    new OptionInstance(
      (game) => game.player.property.money >= 3,
      '구독하자.',
      `ChatGPT를 7일 구독하여 돈이 3 감소한다.`,
      (game) => {
        game.player.property.money -= 3;
        game.property.eventData['ChatGPT'].leftDay = 7;
        return true;
      },
    ),
    new OptionInstance(
      (game) => game.player.property.money >= 6,
      '구독하자.',
      `ChatGPT를 14일 구독하여 돈이 6 감소한다.`,
      (game) => {
        game.player.property.money -= 6;
        game.property.eventData['ChatGPT'].leftDay = 14;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '구독하지 말자.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);
