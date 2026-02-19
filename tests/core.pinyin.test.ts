import { describe, expect, it } from 'vitest';
import { normalizePinyin } from '../src/core/pinyin/normalize';
import { splitSyllable } from '../src/core/pinyin/split';
import { convert } from '../src/core/pinyin/convert';

describe('normalizePinyin', () => {
  it('lowercases and trims', () => {
    expect(normalizePinyin(' Ni ')).toBe('ni');
  });

  it('maps umlaut vowels to v', () => {
    expect(normalizePinyin('Nǚ ')).toBe('nv');
  });
});

describe('splitSyllable', () => {
  it('splits complex initials', () => {
    expect(splitSyllable('shuang')).toEqual({ sheng: 'sh', yun: 'uang' });
  });

  it('handles vowel-only syllables', () => {
    expect(splitSyllable('ai')).toEqual({ yun: 'ai' });
  });

  it('handles zh/ch/sh clusters', () => {
    expect(splitSyllable('zhong')).toEqual({ sheng: 'zh', yun: 'ong' });
  });
});

describe('convert', () => {
  it('converts hanzi to normalized pinyin syllables', () => {
    expect(convert('好')[0].pinyin).toBe('hao');
    expect(convert('中')[0].pinyin).toBe('zhong');
  });
});
