import { Paper, Stack, styled, Typography } from '@mui/material';
import { useMemo } from 'react';

import { teko } from '../app/font';
import { BEAT_RANGE } from '../const';
import { useAppStore } from '../stores/AppStoreProvider';

const ScoreTypography = styled(Typography)(() => ({
  ...teko.style,
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
}));

export function Score(): JSX.Element {
  const score = useAppStore(state => state.score);

  const status = useMemo(() => {
    if (score.timeDiff === Infinity) {
      return '';
    } else if (Math.abs(score.timeDiff) <= BEAT_RANGE) {
      return 'PERFECT';
    } else if (Math.abs(score.timeDiff) <= BEAT_RANGE * 2) {
      return 'GOOD';
    } else {
      return 'BAD';
    }
  }, [score]);

  return (
    <Paper
      sx={{
        width: '200px',
        p: 2,
        backgroundColor: 'transparent',
        color: '#81d5cd',
      }}
    >
      <Stack alignItems="center" sx={{ transform: 'skew(-5deg, -5deg)' }}>
        <ScoreTypography variant="h4">SCORE</ScoreTypography>
        <ScoreTypography variant="h1" mt={-1} mb={-2}>
          {score.total}
        </ScoreTypography>
        {status.length !== 0 && (
          <>
            <ScoreTypography variant="h5">{status}</ScoreTypography>
            <ScoreTypography variant="h6">
              ({score.timeDiff > 0 ? `+${score.timeDiff}` : score.timeDiff}ms)
            </ScoreTypography>
          </>
        )}
      </Stack>
    </Paper>
  );
}
