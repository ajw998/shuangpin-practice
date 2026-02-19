const UMLAUT_PATTERN = /[üǖǘǚǜ]/gi;

export function normalizePinyin(input: string): string {
  if (!input) return '';
  const normalized = input
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '')
    .replace(UMLAUT_PATTERN, 'v');
  return normalized === 'ng' ? 'en' : normalized;
}
