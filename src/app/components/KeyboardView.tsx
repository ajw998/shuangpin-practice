import type { ShuangpinScheme } from '../../core/schemes';

type KeyboardViewProps = {
  expectedKeys: string;
  scheme: ShuangpinScheme;
  highlight: boolean;
};

type KeyboardRow = {
  keys: string;
  offsetPx: number;
};

const ROWS: KeyboardRow[] = [
  { keys: 'qwertyuiop', offsetPx: 0 },
  { keys: 'asdfghjkl', offsetPx: 28 },
  { keys: 'zxcvbnm', offsetPx: 56 },
];

export default function KeyboardView({
  expectedKeys,
  scheme,
  highlight,
}: KeyboardViewProps) {
  const activeKeys = highlight
    ? new Set(expectedKeys.split(''))
    : new Set<string>();
  const labels = buildKeyLabels(scheme);

  return (
    <div className={`keyboard`}>
      {ROWS.map((row) => {
        const keys = row.keys.split('').map((key) => {
          const highlight = activeKeys.has(key);
          const entries = labels.get(key) ?? [];
          const shengs = entries.filter(
            (l) => scheme.sheng[l as keyof typeof scheme.sheng] !== undefined,
          );
          const yuns = entries.filter(
            (l) => scheme.yun[l as keyof typeof scheme.yun] !== undefined,
          );
          return (
            <div
              key={key}
              className={`key${highlight ? ' highlight' : ''}`}
              aria-label={`Key ${key}`}
            >
              <div className="key-top">
                <span className="key-main">{key.toUpperCase()}</span>
                <span className="key-sheng">
                  {shengs.length ? shengs.join('') : ''}
                </span>
              </div>
              <div className="key-bottom">
                {yuns.length
                  ? yuns.map((y) => <div key={`${key}-${y}`}>{y}</div>)
                  : '\u00a0'}
              </div>
            </div>
          );
        });
        return (
          <div
            key={row.keys}
            className="keyboard-row"
            style={{ marginLeft: `${row.offsetPx}px` }}
          >
            {keys}
          </div>
        );
      })}
    </div>
  );
}

function buildKeyLabels(scheme: ShuangpinScheme): Map<string, string[]> {
  const map = new Map<string, string[]>();

  const add = (key: string, label: string) => {
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(label);
  };

  for (const [sheng, key] of Object.entries(scheme.sheng)) {
    add(key, sheng);
  }

  for (const [yun, key] of Object.entries(scheme.yun)) {
    add(key, yun);
  }

  for (const [key, values] of map) {
    map.set(key, values.sort());
  }

  return map;
}
