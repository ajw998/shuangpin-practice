export const SHENG_KEYS = [
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
  'zh',
  'ch',
  'sh',
] as const;

export const YUN_KEYS = [
  'a',
  'ai',
  'an',
  'ang',
  'ao',
  'e',
  'ei',
  'en',
  'eng',
  'i',
  'ia',
  'ian',
  'iang',
  'iao',
  'ie',
  'in',
  'ing',
  'iong',
  'iu',
  'o',
  'ong',
  'ou',
  'u',
  'ua',
  'uai',
  'ue',
  'uan',
  'uang',
  'ui',
  'un',
  'uo',
  'v',
  've',
  'vn',
] as const;

export const ZERO_INITIAL_YUNS = [
  'a',
  'ai',
  'an',
  'ang',
  'ao',
  'e',
  'ei',
  'en',
  'eng',
  'er',
  'o',
  'ou',
] as const;

export type ShengKey = (typeof SHENG_KEYS)[number];
export type YunKey = (typeof YUN_KEYS)[number];
export type ZeroInitialYun = (typeof ZERO_INITIAL_YUNS)[number];

export type ZeroInitialOverrides = Record<ZeroInitialYun, string>;

export type ShuangpinScheme = {
  id: string;
  displayName: string;
  sheng: Record<ShengKey, string>;
  yun: Record<YunKey, string>;
  zeroInitialOverrides: ZeroInitialOverrides;
};
