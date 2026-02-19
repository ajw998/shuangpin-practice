export type PromptSource = {
  next: () => string;
};

export type PromptSourceOptions = {
  random?: () => number;
  filter?: (char: string) => boolean;
};

const defaultFilter = (char: string) => /\p{Unified_Ideograph}/u.test(char);

export function buildPromptSource(
  text: string,
  options: PromptSourceOptions = {},
): PromptSource {
  const random = options.random ?? Math.random;
  const filter = options.filter ?? defaultFilter;
  const characters = Array.from(text).filter(filter);
  let lastPick: string | null = null;

  return {
    next: () => {
      if (characters.length === 0) return '';
      if (characters.length === 1) {
        lastPick = characters[0];
        return characters[0];
      }

      let candidate = lastPick;
      let attempts = 0;
      while (candidate === lastPick && attempts < 5) {
        const index = Math.floor(random() * characters.length);
        candidate = characters[index];
        attempts += 1;
      }
      lastPick = candidate!;
      return candidate!;
    },
  };
}
