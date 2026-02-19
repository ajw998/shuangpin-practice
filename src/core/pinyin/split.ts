export type SplitResult = {
  sheng?: string;
  yun: string;
};

const SHENGS = [
  'zh',
  'ch',
  'sh',
  'b',
  'p',
  'm',
  'f',
  'd',
  't',
  'n',
  'l',
  'g',
  'k',
  'h',
  'j',
  'q',
  'x',
  'r',
  'z',
  'c',
  's',
  'y',
  'w',
];

export function splitSyllable(pinyin: string): SplitResult {
  const normalized = pinyin.trim();
  for (const sheng of SHENGS) {
    if (normalized.startsWith(sheng)) {
      const yun = normalized.slice(sheng.length);
      return { sheng, yun: yun || '' };
    }
  }

  return { yun: normalized };
}
