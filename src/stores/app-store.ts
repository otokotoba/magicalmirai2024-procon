import { Player } from 'textalive-app-api';
import { type StoreApi } from 'zustand';
import { createStore } from 'zustand/vanilla';

export type AppState = {
  player?: Player;
  loading: boolean;
  playing: boolean;
  lyrics: {
    phrase: string;
    word: string;
  };
  progress: number;
  showLyrics: boolean;
  showControls: boolean;
  canvasHeight?: number;
  alive: boolean;
  beat: {
    startTime: number;
    globalIndex: number;
    localIndex: number;
  };
  score: {
    total: number;
    timeDiff: number;
    perfect: number;
    good: number;
    bad: number;
  };
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
  setBeat: (beat: AppState['beat']) => void;
  setTotalScore: (score: number) => void;
  setTimeDiff: (timeDiff: AppState['score']['timeDiff']) => void;
  increasePerfectCount: () => void;
  increaseGoodCount: () => void;
  increaseBadCount: () => void;
};

export type AppStore = AppState & AppActions;

export const defaultInitState: AppState = {
  loading: true,
  playing: false,
  lyrics: {
    phrase: '',
    word: '',
  },
  progress: 0,
  showLyrics: true,
  showControls: true,
  alive: true,
  beat: {
    startTime: -1,
    globalIndex: -1,
    localIndex: -1,
  },
  score: {
    total: 0,
    timeDiff: Infinity,
    perfect: 0,
    good: 0,
    bad: 0,
  },
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

    setBeat: beat =>
      set(state =>
        state.beat.globalIndex === beat.globalIndex ? state : { beat }
      ),

    setTotalScore: score =>
      set(state => ({
        score: { ...state.score, total: state.score.total + score },
      })),
    setTimeDiff: timeDiff =>
      set(({ score }) => ({ score: { ...score, timeDiff } })),
    increasePerfectCount: () =>
      set(({ score }) => ({ score: { ...score, perfect: score.perfect + 1 } })),
    increaseGoodCount: () =>
      set(({ score }) => ({ score: { ...score, good: score.good + 1 } })),
    increaseBadCount: () =>
      set(({ score }) => ({ score: { ...score, bad: score.bad + 1 } })),
  }));
};
