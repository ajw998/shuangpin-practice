import { xiaoheBase } from './xiaohe';
import {
  SHENG_KEYS,
  YUN_KEYS,
  ZERO_INITIAL_YUNS,
  type ShuangpinScheme,
  type ZeroInitialOverrides,
} from './types';

export type {
  ShuangpinScheme,
  ShengKey,
  YunKey,
  ZeroInitialOverrides,
} from './types';

export type SchemeId = 'xiaohe';

const ZERO_INITIAL_OVERRIDES: ZeroInitialOverrides = {
  a: 'aa',
  ai: 'ai',
  an: 'an',
  ang: 'ah',
  ao: 'ao',
  e: 'ee',
  ei: 'ei',
  en: 'en',
  eng: 'eg',
  er: 'er',
  o: 'oo',
  ou: 'ou',
};

const withSharedOverrides = (
  scheme: Omit<ShuangpinScheme, 'zeroInitialOverrides'>,
): ShuangpinScheme => ({
  ...scheme,
  zeroInitialOverrides: ZERO_INITIAL_OVERRIDES,
});

export const xiaohe = withSharedOverrides(xiaoheBase);

export const schemes: Record<SchemeId, ShuangpinScheme> = {
  xiaohe: { ...xiaohe, displayName: '小鹤' },
};

export { SHENG_KEYS, YUN_KEYS, ZERO_INITIAL_YUNS, ZERO_INITIAL_OVERRIDES };
