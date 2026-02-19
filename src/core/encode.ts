import { splitSyllable } from './pinyin/split';
import { normalizePinyin } from './pinyin/normalize';
import type { ShuangpinScheme } from './schemes';

export function encodeSyllable(
  scheme: ShuangpinScheme,
  pinyin: string,
): string | null {
  const normalized = normalizePinyin(pinyin);
  if (!normalized) return null;

  const { sheng, yun } = splitSyllable(normalized);
  const shengCode = sheng ? scheme.sheng[sheng] : '';
  const zeroInitialOverride =
    !sheng && scheme.zeroInitialOverrides
      ? scheme.zeroInitialOverrides[yun]
      : undefined;
  const yunCode = scheme.yun[yun];

  const finalCode = zeroInitialOverride ?? yunCode;

  if (finalCode === undefined || (sheng && shengCode === undefined)) {
    return null;
  }

  return `${shengCode ?? ''}${finalCode}`;
}
