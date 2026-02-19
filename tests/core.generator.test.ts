import { describe, expect, it } from 'vitest';
import { buildPromptSource } from '../src/core/generator';

describe('buildPromptSource', () => {
  it('selects characters from provided text with filter', () => {
    const source = buildPromptSource('你a好', { random: () => 0 });
    expect(source.next()).toBe('你');
  });

  it('returns empty string when no characters match', () => {
    const source = buildPromptSource('abc', { random: () => 0 });
    expect(source.next()).toBe('');
  });

  it('avoids immediate repeats when possible', () => {
    let calls = 0;
    const source = buildPromptSource('你好', {
      random: () => {
        calls += 1;
        return calls % 2;
      },
    });
    const first = source.next();
    const second = source.next();
    expect(second).not.toBe(first);
  });
});
