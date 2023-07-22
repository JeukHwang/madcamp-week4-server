import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 개발자님 = new EventInstance(
  (game) => !game.property.eventData['개발자님!'].isDone && WeekDay(4)(game),
  '개발자님!',
  '이 버튼이랑 저 표랑 정렬해주세요. 바로 되죠?',
  [
    new OptionInstance(
      NoCondition,
      '디자이너님! 지난번 시안은 그냥 원래대로 바꿔주세요.',
      `체력이 1 감소한다.`,
      (game) => {
        game.player.property.health -= 1;
        game.property.eventData['개발자님!'].isDone = true;
        return true;
      },
    ),
    new OptionInstance(
      NoCondition,
      '아니! 금요일 퇴근 시간에 왜 그러세요!!',
      `체력이 1 감소한다.`,
      (game) => {
        game.player.property.health -= 1;
        game.property.eventData['개발자님!'].isDone = true;
        return true;
      },
    ),
  ],
);
