import { ArrowBackRounded, ArrowForwardRounded } from '@mui/icons-material';
import {
  Backdrop,
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useState } from 'react';

import { BEAT_RANGE, SCORE_ON_GOOD, SCORE_ON_PERFECT } from './Player';
import { notoSansJP, teko } from '../app/font';
import { useAppStore } from '../stores/AppStoreProvider';

const NotoSansJP = styled(Typography)(() => notoSansJP.style);
const Teko = styled(Typography)(() => teko.style);

const titles = ['操作方法', 'ゲームの説明'];
const pages = [<Page1 key={0} />, <Page2 key={1} />];

export function Description(): JSX.Element {
  const [showDiscription, toggleShowDescription] = useAppStore(state => [
    state.showDescription,
    state.toggleShowDescription,
  ]);
  const [page, setPage] = useState(0);
  const theme = useTheme();

  const handlePrev = useCallback(() => {
    setPage(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const handleNext = useCallback(() => {
    setPage(prev => (prev < pages.length - 1 ? prev + 1 : prev));
  }, []);

  const handleStart = useCallback(() => {
    toggleShowDescription();
  }, [toggleShowDescription]);

  return (
    showDiscription && (
      <>
        <Backdrop
          open={showDiscription}
          sx={{
            zIndex: theme.zIndex.modal - 1,
            backgroundColor: 'transparent',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            zIndex: theme.zIndex.modal,
          }}
        >
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Paper
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                width: '100%',
                maxWidth: '900px',
              }}
            >
              <DialogTitle>
                <NotoSansJP variant="h5" sx={{ fontWeight: '600' }}>
                  {titles[page]}
                </NotoSansJP>
              </DialogTitle>

              <DialogContent dividers>{pages[page]}</DialogContent>
              <DialogActions sx={{ display: 'block' }}>
                <Stack spacing={2}>
                  <ButtonGroup fullWidth>
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      disabled={page === 0}
                      onClick={handlePrev}
                      sx={{
                        flexGrow: 1,
                        borderRadius: `${theme.shape.borderRadius}px`,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ArrowBackRounded />
                    </IconButton>
                    <IconButton
                      disableFocusRipple
                      disableRipple
                      disabled={page === pages.length - 1}
                      onClick={handleNext}
                      sx={{
                        flexGrow: 1,
                        borderRadius: `${theme.shape.borderRadius}px`,
                        '&:hover': {
                          backgroundColor: theme.palette.action.hover,
                        },
                      }}
                    >
                      <ArrowForwardRounded />
                    </IconButton>
                  </ButtonGroup>

                  {page === pages.length - 1 && (
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={handleStart}
                    >
                      スタート
                    </Button>
                  )}
                </Stack>
              </DialogActions>
            </Paper>
          </Stack>
        </Box>
      </>
    )
  );
}

function Page1(): JSX.Element {
  return (
    <Stack spacing={1}>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">WASD</Teko>
        <NotoSansJP variant="h6">移動</NotoSansJP>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Shift</Teko>
        <NotoSansJP variant="h6">ダッシュ</NotoSansJP>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Space</Teko>
        <NotoSansJP variant="h6">ジャンプ</NotoSansJP>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Click on the Game Screen</Teko>
        <NotoSansJP variant="h6">ポインターロック</NotoSansJP>
      </Stack>

      <Divider textAlign="center" flexItem>
        <NotoSansJP variant="body1">ポインターロック時</NotoSansJP>
      </Divider>

      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Click</Teko>
        <NotoSansJP variant="h6">ハートを投げる</NotoSansJP>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Scroll</Teko>
        <NotoSansJP variant="h6">視野角の調整</NotoSansJP>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Teko variant="h4">Escape</Teko>
        <NotoSansJP variant="h6">ポインターロック解除</NotoSansJP>
      </Stack>
    </Stack>
  );
}

function Page2(): JSX.Element {
  return (
    <NotoSansJP variant="h6">
      ポインターロック時にリズムに合わせて左クリックすると、得点を稼ぐことができます。
      ±{BEAT_RANGE}ミリ秒以内は{SCORE_ON_PERFECT}点、±{BEAT_RANGE * 2}
      ミリ秒以内は{SCORE_ON_GOOD}点です。
    </NotoSansJP>
  );
}
