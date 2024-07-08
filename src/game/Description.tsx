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
import { useCallback, useEffect, useRef, useState } from 'react';

import { notoSansJP, teko } from '../app/font';
import { BEAT_RANGE, SCORE_ON_GOOD, SCORE_ON_PERFECT } from '../const';
import { useAppStore } from '../stores/AppStoreProvider';
import { ExtLink, RowStack } from '../UtilComponents';

const NotoSansJP = styled(Typography)(() => notoSansJP.style);
const Teko = styled(Typography)(() => teko.style);

const pages = [
  { title: '操作方法', component: <HowToControl key={0} /> },
  { title: 'ゲームの説明', component: <GameDescription key={1} /> },
  { title: 'クレジット', component: <Credits key={2} /> },
  { title: 'リンク', component: <LinkCollection key={3} /> },
];
const mobilePages = [{ title: '注意', component: <Caution key={4} /> }];

export function Description({
  isMobile = false,
}: {
  isMobile?: boolean;
}): JSX.Element {
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

  useEffect(() => {
    if (
      isMobile &&
      pages[pages.length - 1].title !==
        mobilePages[mobilePages.length - 1].title
    ) {
      pages.push(...mobilePages);
    }
  }, [isMobile]);

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
            px: 2,
            backgroundColor: isMobile ? 'transparent' : 'rgba(0, 0, 0, 0.75)',
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
                    disabled={page < pages.length - 1 || isMobile}
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

function Credits(): JSX.Element {
  return (
    <Stack spacing={1}>
      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          TextAlive App API
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://developer.textalive.jp/">ホームページ</ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          楽曲
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://youtu.be/zBmGISSf6X8?si=elOWJ__GyKZD75RW">
            「The Marks」2ouDNS
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <Divider textAlign="center" flexItem>
        <NotoSansJP variant="body1">3Dモデル</NotoSansJP>
      </Divider>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          初音ミク
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://www.deviantart.com/piloulabaka/art/MMD-YYB-Racing-Miku-2022-model-DL-905665700">
            YYB & Pilou La Baka
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          ステージ
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://www.unrealengine.com/marketplace/ja/product/awardstage">
            Filmingbox
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          ハート
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://market.pmnd.rs/model/heart">
            Kay Lousberg
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          スピーカー
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://assetstore.unity.com/packages/3d/props/electronics/hq-acoustic-system-41886">
            Next Level 3D
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <Divider textAlign="center" flexItem>
        <NotoSansJP variant="body1">アニメーション</NotoSansJP>
      </Divider>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          ダンス
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://www.mixamo.com/">Maximo</ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          まばたき
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://bowlroll.net/file/251160">さの</ExtLink>
        </NotoSansJP>
      </RowStack>
    </Stack>
  );
}

function LinkCollection(): JSX.Element {
  return (
    <Stack spacing={2}>
      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          初音ミク「マジカルミライ 2024」
          <br />
          プログラミングコンテスト
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://magicalmirai.com/2024/procon/">
            ホームページ
          </ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          制作者
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://www.youtube.com/@otokotoba/">奈奈之</ExtLink>
        </NotoSansJP>
      </RowStack>

      <RowStack>
        <NotoSansJP variant="h5" fontWeight={500}>
          サポートサーバー
        </NotoSansJP>
        <NotoSansJP variant="h6">
          <ExtLink href="https://discord.gg/Waut2JEgNS">Discord</ExtLink>
        </NotoSansJP>
      </RowStack>
    </Stack>
  );
}

function Caution(): JSX.Element {
  return (
    <NotoSansJP variant="h6">
      操作性やスペックの都合上、
      スマートフォンやタブレットではプレイできません。
      パソコンから再度アクセスしてください。
    </NotoSansJP>
  );
}
