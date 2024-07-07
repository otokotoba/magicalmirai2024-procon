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
  StackProps,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { useCallback, useEffect, useRef, useState } from 'react';

import { BEAT_RANGE, SCORE_ON_GOOD, SCORE_ON_PERFECT } from './Player';
import { notoSansJP, teko } from '../app/font';
import { useAppStore } from '../stores/AppStoreProvider';
import { RowStack } from '../UtilComponents';

const NotoSansJP = styled(Typography)(() => notoSansJP.style);
const Teko = styled(Typography)(() => teko.style);

const pages = [
  { title: '操作方法', component: <HowToControl key={0} /> },
  { title: 'ゲームの説明', component: <GameDescription key={1} /> },
];

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

  const content = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('auto');

  useEffect(() => {
    if (!content.current) return;

    setHeight(`${content.current.getBoundingClientRect().height}px`);
  }, []);

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
                maxWidth: '800px',
              }}
            >
              <DialogTitle>
                <NotoSansJP variant="h5" fontWeight={600}>
                  {pages[page].title}
                </NotoSansJP>
              </DialogTitle>

              <DialogContent dividers ref={content} sx={{ height }}>
                {pages[page].component}
              </DialogContent>

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

                  <Button
                    disabled={page < pages.length - 1}
                    variant="contained"
                    disableElevation
                    onClick={handleStart}
                  >
                    スタート
                  </Button>
                </Stack>
              </DialogActions>
            </Paper>
          </Stack>
        </Box>
      </>
    )
  );
}

function HowToControl(): JSX.Element {
  return (
    <Stack spacing={1}>
      <RowStack>
        <Teko variant="h4">WASD</Teko>
        <NotoSansJP variant="h6">移動</NotoSansJP>
      </RowStack>

      <RowStack>
        <Teko variant="h4">Shift</Teko>
        <NotoSansJP variant="h6">ダッシュ</NotoSansJP>
      </RowStack>

      <RowStack>
        <Teko variant="h4">Space</Teko>
        <NotoSansJP variant="h6">ジャンプ</NotoSansJP>
      </RowStack>

      <RowStack>
        <Teko variant="h4">Click on the Game Screen</Teko>
        <NotoSansJP variant="h6">ポインターロック</NotoSansJP>
      </RowStack>

      <Divider textAlign="center" flexItem>
        <NotoSansJP variant="body1">ポインターロック時</NotoSansJP>
      </Divider>

      <RowStack>
        <Teko variant="h4">Click</Teko>
        <NotoSansJP variant="h6">ハートを投げる</NotoSansJP>
      </RowStack>

      <RowStack>
        <Teko variant="h4">Scroll</Teko>
        <NotoSansJP variant="h6">視野角の調整</NotoSansJP>
      </RowStack>

      <RowStack>
        <Teko variant="h4">Escape</Teko>
        <NotoSansJP variant="h6">ポインターロック解除</NotoSansJP>
      </RowStack>
    </Stack>
  );
}

function GameDescription(): JSX.Element {
  return (
    <NotoSansJP variant="h6">
      ポインターロック時にリズムに合わせてクリックすると、得点を稼ぐことができます。
      ±{BEAT_RANGE}ミリ秒以内は{SCORE_ON_PERFECT}点、±{BEAT_RANGE * 2}
      ミリ秒以内は{SCORE_ON_GOOD}点です。
    </NotoSansJP>
  );
}
