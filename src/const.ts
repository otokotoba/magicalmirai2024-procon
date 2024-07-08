import { KeyboardControlsEntry } from '@react-three/drei';

export const TITLE = '初音ミクと相思相愛';
export const DESCRIPTION =
  '初音ミクと愛を伝え合うリズムゲーム×リリックアプリ | 初音ミク「マジカルミライ 2024」プログラミングコンテスト 応募作品';
export const URL =
  'https://magicalmirai2024-procon-otokotobas-projects.vercel.app/';

export const SONG_URL = 'https://piapro.jp/t/xEA7/20240202002556';
export const TIME_DELTA = 50;

export const BEAT_RANGE = 50;
export const SCORE_ON_PERFECT = 100;
export const SCORE_ON_GOOD = 50;

export const KEYMAP: KeyboardControlsEntry[] = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'leftward', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'rightward', keys: ['ArrowRight', 'KeyD'] },
  { name: 'jump', keys: ['Space'] },
  { name: 'run', keys: ['Shift'] },
];

export const SNACKBAR_DURATION = 4000;

export const HASHTAG = '#初音ミク #マジカルミライ2024 #TextAlive';
