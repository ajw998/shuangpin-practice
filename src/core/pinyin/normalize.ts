const UMLAUT_PATTERN = /[üǖǘǚǜ]/gi;
const SYLLABLE_ALIASES: Record<string, string> = {
  ng: 'en',
};

export function normalizePinyin(input: string): string {
  if (!input) return '';
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(UMLAUT_PATTERN, 'v');
  return SYLLABLE_ALIASES[normalized] ?? normalized;
}
