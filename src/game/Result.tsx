import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { useCallback, useEffect } from 'react';

import { SCORE_ON_GOOD, SCORE_ON_PERFECT } from './Player';
import { notoSansJP, teko } from '../app/font';
import { useAppStore } from '../stores/AppStoreProvider';

const NotoSansJP = styled('span')(() => ({
  ...notoSansJP.style,
  fontSize: '1.5rem',
}));

const Teko = styled(Typography)(() => teko.style);

export function Result(): JSX.Element {
  const [done, score, resetStore, setLoading, player, setShowControls] =
    useAppStore(state => [
      state.done,
      state.score,
      state.resetStore,
      state.setLoading,
      state.player,
      state.setShowControls,
    ]);

  useEffect(() => {
    if (done) {
      document.exitPointerLock();
      setShowControls(true);
    }
  }, [done, setShowControls]);

  const handlePlayAgain = useCallback(() => {
    if (!player) return;

    player.startVideoSeek();
    player.requestMediaSeek(0);
    player.endVideoSeek();

    resetStore();
    setLoading(false);
  }, [player, resetStore, setLoading]);

  return (
    <Dialog
      open={done}
      maxWidth="xs"
      fullWidth
      PaperProps={{ sx: { backgroundColor: 'rgba(255, 255, 255, 0.75)' } }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack alignItems="center">
          <Teko variant="h3">SCORE</Teko>
        </Stack>
      </DialogTitle>

      <DialogContent dividers>
        <Stack alignItems="center" spacing={1}>
          <Stack>
            <Teko variant="h1">{score.total}</Teko>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Teko variant="h4">PERFECT</Teko>
            <Teko variant="h4">
              {SCORE_ON_PERFECT}
              {' × '}
              {score.perfect}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Teko variant="h4">GOOD</Teko>
            <Teko variant="h4">
              {SCORE_ON_GOOD}
              {' × '}
              {score.good}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </Stack>

          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ width: '100%' }}
          >
            <Teko variant="h4">BAD</Teko>
            <Teko variant="h4">
              {score.bad}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ display: 'block' }}>
        <Stack>
          <Button
            variant="contained"
            disableElevation
            onClick={handlePlayAgain}
          >
            もう一度プレイする
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
