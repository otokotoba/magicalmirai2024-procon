import { PermMediaRounded } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { toBlob } from 'html-to-image';
import { useCallback, useEffect, useRef, useState } from 'react';

import { notoSansJP, teko } from '../app/font';
import {
  SCORE_ON_GOOD,
  SCORE_ON_PERFECT,
  SNACKBAR_DURATION,
  X_TEXT,
} from '../const';
import { useAppStore } from '../stores/AppStoreProvider';
import { ExtLink, RowStack, XIcon } from '../UtilComponents';

const NotoSansJP = styled('span')(() => ({
  ...notoSansJP.style,
  fontSize: '1.5rem',
}));

const Teko = styled(Typography)(() => teko.style);

export function Result(): JSX.Element {
  const [
    done,
    score,
    resetStore,
    toggleLoading,
    player,
    setShowControls,
    toggleShowDescription,
  ] = useAppStore(state => [
    state.done,
    state.score,
    state.resetStore,
    state.toggleLoading,
    state.player,
    state.setShowControls,
    state.toggleShowDescription,
  ]);

  const theme = useTheme();

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
    toggleLoading();
    toggleShowDescription();
  }, [player, resetStore, toggleLoading, toggleShowDescription]);

  const content = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'default' | 'success' | 'error'>(
    'default'
  );

  const handleCopyImage = useCallback(async () => {
    if (!content.current) return;

    setMessage('画像を生成中...');
    setStatus('default');

    try {
      const blob = await toBlob(content.current, {
        style: {
          background: `linear-gradient(to right bottom, ${theme.subPalette.primary} 0%, ${theme.subPalette.secondary} 100%)`,
        },
      });

      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);

      setMessage('クリップボードにコピーしました。');
      setStatus('success');
    } catch (e) {
      setMessage(
        'エラーが発生しました。もう一度試すか、スクリーンショットを撮ってください。'
      );
      setStatus('error');
    }

    setTimeout(() => setMessage(''), SNACKBAR_DURATION);
  }, [theme.subPalette]);

  return (
    <Dialog
      open={done}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { backgroundColor: 'rgba(255, 255, 255, 0.75)', m: 0 },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Stack alignItems="center">
          <Teko variant="h3">SCORE</Teko>
        </Stack>
      </DialogTitle>

      <DialogContent dividers ref={content}>
        <Stack spacing={1}>
          <Stack alignSelf="center">
            <Teko variant="h1">{score.total}</Teko>
          </Stack>

          <RowStack>
            <Teko variant="h4">PERFECT</Teko>
            <Teko variant="h4">
              {SCORE_ON_PERFECT}
              {' × '}
              {score.perfect}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </RowStack>

          <RowStack>
            <Teko variant="h4">GOOD</Teko>
            <Teko variant="h4">
              {SCORE_ON_GOOD}
              {' × '}
              {score.good}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </RowStack>

          <RowStack>
            <Teko variant="h4">BAD</Teko>
            <Teko variant="h4">
              {score.bad}
              <NotoSansJP>回</NotoSansJP>
            </Teko>
          </RowStack>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ display: 'block' }}>
        <Stack spacing={1}>
          <Button
            variant="contained"
            disableElevation
            onClick={handlePlayAgain}
          >
            もう一度プレイする
          </Button>

          <Button
            variant="contained"
            disableElevation
            startIcon={<PermMediaRounded />}
            onClick={handleCopyImage}
          >
            結果の画像をコピーする
          </Button>

          <Snackbar
            open={!!message}
            message={message}
            autoHideDuration={SNACKBAR_DURATION}
            ContentProps={{
              sx:
                status === 'default'
                  ? {}
                  : {
                      backgroundColor:
                        status === 'success'
                          ? theme.palette.success.main
                          : theme.palette.error.main,
                    },
            }}
          />

          <ExtLink href={`https://twitter.com/intent/tweet?text=${X_TEXT}`}>
            <Button
              variant="contained"
              disableElevation
              sx={{
                width: '100%',
                backgroundColor: '#000000',
                '&:hover': {
                  backgroundColor: theme.palette.grey[900],
                },
              }}
              startIcon={
                <XIcon fill="#ffffff" sx={{ fontSize: '16px !important' }} />
              }
            >
              <span style={{ transform: 'translateY(1px)' }}>Xに投稿する</span>
            </Button>
          </ExtLink>
        </Stack>
      </DialogActions>
    </Dialog>
  );
}
