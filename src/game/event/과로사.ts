import { EventInstance, NoCondition, OptionInstance } from '../logic/event';

export const 과로사 = new EventInstance(
  NoCondition,
  '과로사',
  '일하기도 전에 체력이 없다.',
  [
    // object로 바꾼 후 OptionInstance를 EventInstance에서 만들기
    new OptionInstance(NoCondition, '으악...', `죽는다`, (game) => {
      game.property.status.unshift({ type: 'endGame' });
      return true;
    }),
  ],
);
