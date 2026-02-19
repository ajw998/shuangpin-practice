import { describe, expect, it } from 'vitest';
import { encodeSyllable } from '../src/core/encode';
import { xiaohe } from '../src/core/schemes';

describe('encodeSyllable (Xiaohe)', () => {
  it('encodes simple finals', () => {
    expect(encodeSyllable(xiaohe, 'ni')).toBe('ni');
    expect(encodeSyllable(xiaohe, 'hao')).toBe('hc');
  });

  it('encodes clustered initials', () => {
    expect(encodeSyllable(xiaohe, 'zhong')).toBe('vs');
    expect(encodeSyllable(xiaohe, 'shuang')).toBe('ul');
  });

  it('handles zero-initial overrides', () => {
    expect(encodeSyllable(xiaohe, 'e')).toBe('ee');
    expect(encodeSyllable(xiaohe, 'o')).toBe('oo');
    expect(encodeSyllable(xiaohe, 'eng')).toBe('eg');
    expect(encodeSyllable(xiaohe, 'er')).toBe('er');
    expect(encodeSyllable(xiaohe, 'ng')).toBe('en');
    expect(encodeSyllable(xiaohe, 'heng')).toBe('hg');
  });

  it('normalizes and handles iu finals', () => {
    expect(encodeSyllable(xiaohe, 'QIU')).toBe('qq');
  });

  it('returns null when mapping is missing', () => {
    expect(encodeSyllable(xiaohe, 'zzz')).toBeNull();
  });
});
