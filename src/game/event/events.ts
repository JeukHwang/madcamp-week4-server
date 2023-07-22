import * as assert from 'assert';
import type { GameEvent } from '../logic/event';
import { CORS, CORS_문제 } from './CORS';
import { ChatGPT } from './ChatGPT';
import { 개발자님 } from './개발자님';
import { 과로사 } from './과로사';
import { 모니터_암이_필요해 } from './모니터_암이_필요해';
import { 밥은_먹고_다니니 } from './밥은_먹고_다니니';
import { 버티컬_마우스가_필요해 } from './버티컬_마우스가_필요해';
import { 변화의_물결 } from './변화의_물결';
import { 불이야 } from './불이야';
import { 새로운_컴퓨터가_필요해 } from './새로운_컴퓨터가_필요해';
import { 성장 } from './성장';
import { 데이터_시각화_외주, 웹사이트_개발_외주 } from './외주';
import { 주간_목표 } from './주간_목표';
import { 콩나물이_필요해 } from './콩나물이_필요해';
import { 해커톤 } from './해커톤';

const eventList: GameEvent[] = [
  성장,
  주간_목표,
  변화의_물결,
  밥은_먹고_다니니,
  버티컬_마우스가_필요해,
  개발자님,
  불이야,
  CORS,
  CORS_문제,
  해커톤,
  웹사이트_개발_외주,
  데이터_시각화_외주,
  모니터_암이_필요해,
  ChatGPT,
  콩나물이_필요해,
  새로운_컴퓨터가_필요해,
  과로사,
];
const eventNameList = [
  '성장',
  '주간 목표',
  '변화의 물결',
  '밥은 먹고 다니니',
  '버티컬 마우스가 필요해',
  '개발자님!',
  '불이야!',
  'CORS',
  'CORS 문제',
  '해커톤',
  '웹사이트 개발 외주',
  '데이터 시각화 외주',
  '모니터 암이 필요해',
  'ChatGPT',
  '콩나물이 필요해',
  '새로운 컴퓨터가 필요해',
  '과로사',
] as const;
export type EventTitle = typeof eventNameList[number];

assert(
  eventList.length === eventNameList.length,
  'eventList and eventNameList should have same length',
);

export function findEventByName(name: EventTitle): GameEvent {
  // TODO : find 결과가 undefined일 때 처리 or add type for title
  return eventList.find((e) => e.title === name) as GameEvent;
}
