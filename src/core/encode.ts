import { splitSyllable } from './pinyin/split';
import { normalizePinyin } from './pinyin/normalize';
import {
  SHENG_KEYS,
  YUN_KEYS,
  ZERO_INITIAL_YUNS,
  type ShuangpinScheme,
  type ShengKey,
  type YunKey,
} from './schemes';
import type { ZeroInitialYun } from './schemes/types';

const isShengKey = (value: string): value is ShengKey =>
  SHENG_KEYS.includes(value as ShengKey);
const isYunKey = (value: string): value is YunKey =>
  YUN_KEYS.includes(value as YunKey);
const isZeroInitialYun = (value: string): value is ZeroInitialYun =>
  ZERO_INITIAL_YUNS.includes(value as ZeroInitialYun);

export function encodeSyllable(
  scheme: ShuangpinScheme,
  pinyin: string,
): string | null {
  const normalized = normalizePinyin(pinyin);
  if (!normalized) return null;

  const { sheng, yun } = splitSyllable(normalized);
  const shengCode =
    sheng && isShengKey(sheng) ? scheme.sheng[sheng] : undefined;
  const zeroInitialOverride =
    !sheng && scheme.zeroInitialOverrides
      ? isZeroInitialYun(yun)
        ? scheme.zeroInitialOverrides[yun]
        : undefined
      : undefined;
  const yunCode = isYunKey(yun) ? scheme.yun[yun] : undefined;

  const finalCode = zeroInitialOverride ?? yunCode;

  if (finalCode === undefined || (sheng && shengCode === undefined)) {
    return null;
  }

  return `${shengCode ?? ''}${finalCode}`;
}
