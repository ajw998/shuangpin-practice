import { useEffect, useMemo, useRef, useState } from 'react';
import { encodeSyllable } from '../../core/encode';
import { schemes } from '../../core/schemes';
import { normalizePinyin } from '../../core/pinyin/normalize';
import { convert } from '../../core/pinyin/convert';
import { practicePromptSource } from '../../core/prompts';
import KeyboardView from './KeyboardView';
import { useAppStore } from '../store';

const RESET_DELAY_MS = 300;

export default function PracticeSession() {
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>(
    'idle',
  );
  const [prompt, setPrompt] = useState(() => practicePromptSource.next());

  const schemeId = useAppStore((state) => state.schemeId);
  const showSyllable = useAppStore((state) => state.showSyllable);
  const showExpectedKeys = useAppStore((state) => state.showExpectedKeys);
  const scheme = schemes[schemeId];
  const inputRef = useRef<HTMLInputElement>(null);
  const [submitted, setSubmitted] = useState('');
  const [locked, setLocked] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, []);

  const tokens = useMemo(() => convert(prompt), [prompt]);
  const syllable = tokens[0]?.pinyin ?? '';
  const expected = useMemo(
    () => encodeSyllable(scheme, normalizePinyin(syllable)),
    [scheme, syllable],
  );

  const handleCheck = (value: string) => {
    setSubmitted(value);
    setLocked(true);
    if (!expected) {
      setStatus('incorrect');
      resetAfterDelay(false);
      return;
    }

    const normalizedInput = normalizePinyin(value);
    const isCorrect = normalizedInput === expected;
    setStatus(isCorrect ? 'correct' : 'incorrect');

    resetAfterDelay(isCorrect);
  };

  const resetAfterDelay = (advance: boolean) => {
    window.setTimeout(() => {
      if (advance) {
        setPrompt(practicePromptSource.next());
      }
      setInput('');
      setSubmitted('');
      setLocked(false);
      setStatus('idle');
      inputRef.current?.focus();
      setIsFocused(true);
    }, RESET_DELAY_MS);
  };

  return (
    <div className="session-card">
      <div className="prompt-row">
        <div className="prompt">
          <div className="prompt-main">{prompt}</div>
          {showSyllable && (
            <div className="prompt-syllable">({syllable || '…'})</div>
          )}
        </div>
      </div>

      <div className="input-row input-row-centered">
        <div
          className={`input-ghost ${
            status === 'correct'
              ? 'input-ghost-success'
              : status === 'incorrect'
                ? 'input-ghost-error'
                : ''
          }${isFocused ? ' input-ghost-focused' : ''}`}
          role="button"
          tabIndex={0}
          aria-label="Type two shuangpin keys"
          onClick={() => inputRef.current?.focus()}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              inputRef.current?.focus();
            }
          }}
        >
          <span className="ghost-char">
            {(locked ? submitted : input)[0] ?? '_'}
          </span>
          <span className="ghost-char">
            {(locked ? submitted : input)[1] ?? '_'}
          </span>
        </div>
        <input
          ref={inputRef}
          type="text"
          maxLength={2}
          inputMode="text"
          className="sr-only"
          value={input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(event) => {
            if (locked) return;
            const nextValue = event.target.value.slice(0, 2);
            setInput(nextValue);
            setStatus('idle');
            if (nextValue.length === 2) {
              handleCheck(nextValue);
            }
          }}
        />
      </div>

      <KeyboardView
        scheme={scheme}
        expectedKeys={expected ?? ''}
        highlight={showExpectedKeys}
      />
    </div>
  );
}
