import { create } from 'zustand';
import type { SchemeId } from '../core/schemes';

type AppState = {
  schemeId: SchemeId;
  showSyllable: boolean;
  showExpectedKeys: boolean;
  setScheme: (schemeId: SchemeId) => void;
  toggleSyllable: () => void;
  toggleExpectedKeys: () => void;
};

export const useAppStore = create<AppState>((set) => ({
  schemeId: 'xiaohe',
  showSyllable: true,
  showExpectedKeys: true,
  setScheme: (schemeId) =>
    set(() => ({
      schemeId,
    })),
  toggleSyllable: () =>
    set((state) => ({
      showSyllable: !state.showSyllable,
    })),
  toggleExpectedKeys: () =>
    set((state) => ({
      showExpectedKeys: !state.showExpectedKeys,
    })),
}));
