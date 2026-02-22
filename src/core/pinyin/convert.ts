import { pinyin } from 'pinyin-pro';
import { normalizePinyin } from './normalize';

export type PinyinToken = {
  hanzi: string;
  pinyin: string;
};

export function convert(text: string): PinyinToken[] {
  if (!text) return [];

  const syllables = pinyin(text, {
    toneType: 'none',
    type: 'array',
    nonZh: 'consecutive',
    v: true,
  }) as string[];

  return text.split('').map((hanzi, index) => ({
    hanzi,
    pinyin: normalizePinyin(syllables[index] ?? ''),
  }));
}
