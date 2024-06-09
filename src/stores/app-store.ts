import { Player } from 'textalive-app-api';
import { type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type AppState = {
  player?: Player;
  loading: boolean;
  text: string;
  progress: number;
  showLyrics: boolean;
};

export type AppActions = {
  setPlayer: (player: AppState['player']) => void;
  setLoading: (loading: AppState['loading']) => void;
  setText: (text: AppState['text']) => void;
  setProgress: (progress: AppState['progress']) => void;
  setShowLyrics: (showLyrics: AppState['showLyrics']) => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  loading: true,
  text: '',
  progress: 0,
  showLyrics: true,
};

export const createAppStore = (
  initState: AppState = defaultInitState
): StoreApi<AppStore> => {
  return createStore<AppStore>()(set => ({
    ...initState,
    setPlayer: player => set(() => ({ player })),
    setLoading: loading => set(() => ({ loading })),
    setText: text => set(() => ({ text })),
    setProgress: progress => set(() => ({ progress })),
    setShowLyrics: showLyrics => set(() => ({ showLyrics })),
  }));
};
