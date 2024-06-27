import { Player } from 'textalive-app-api';
import { type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type AppState = {
  player?: Player;
  loading: boolean;
  playing: boolean;
  lyrics: {
    phrase: string;
  };
  progress: number;
  showLyrics: boolean;
  showControls: boolean;
  canvasHeight?: number;
  alive: boolean;
};

export type AppActions = {
  setPlayer: (player: AppState['player']) => void;
  setLoading: (loading: AppState['loading']) => void;
  setPlaying: (playing: AppState['playing']) => void;
  setLyrics: (text: AppState['lyrics']) => void;
  setProgress: (progress: AppState['progress']) => void;
  setShowLyrics: (showLyrics: AppState['showLyrics']) => void;
  setShowControls: (showControls: AppState['showControls']) => void;
  setCanvasHeight: (canvasHeight: AppState['canvasHeight']) => void;
  setAlive: (alive: AppState['alive']) => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  loading: true,
  playing: false,
  lyrics: {
    phrase: '',
  },
  progress: 0,
  showLyrics: true,
  showControls: true,
  alive: true,
};

export const createAppStore = (
  initState: AppState = defaultInitState
): StoreApi<AppStore> => {
  return createStore<AppStore>()(set => ({
    ...initState,
    setPlayer: player => set(() => ({ player })),
    setLoading: loading => set(() => ({ loading })),
    setPlaying: playing => set(() => ({ playing })),
    setLyrics: lyrics => set(() => ({ lyrics })),
    setProgress: progress => set(() => ({ progress })),
    setShowLyrics: showLyrics => set(() => ({ showLyrics })),
    setShowControls: showControls => set(() => ({ showControls })),
    setCanvasHeight: canvasHeight => set(() => ({ canvasHeight })),
    setAlive: alive => set(() => ({ alive })),
  }));
};
