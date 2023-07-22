import {
  EventInstance,
  NoCondition,
  OptionInstance,
  WeekDay,
} from '../logic/event';

export const 밥은_먹고_다니니 = new EventInstance(
  (game) => WeekDay(2, 4)(game) && game.player.property.money === 0,
  '밥은 먹고 다니니',
  '개발만 하니 딱해보였는지 부모님이 용돈을 보내주셨다.',
  [
    // object로 바꾼 후 OptionInstance를 EventInstance에서 만들기
    new OptionInstance(NoCondition, '감사해요.', `돈이 2 증가한다.`, (game) => {
      const prop = game.player.property;
      prop.money += 2;
      return true;
    }),
    new OptionInstance(
      NoCondition,
      '괜찮아요.',
      `아무 일도 일어나지 않는다.`,
      () => {
        return true;
      },
    ),
  ],
);
