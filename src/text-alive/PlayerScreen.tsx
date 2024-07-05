import { Box, BoxProps, styled, Typography } from '@mui/material';

import { notoSansJP } from '../app/font';
import { Game } from '../game/Game';
import { Result } from '../game/Result';
import { Score } from '../game/Score';
import { useAppStore } from '../stores/AppStoreProvider';

const CaptionContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: '#fff',
  opacity: '75%',
  padding: '8px 16px',
  borderRadius: '4px',
}));

export function PlayerScreen(): JSX.Element {
  const lyrics = useAppStore(state => state.lyrics);
  const showLyrics = useAppStore(state => state.showLyrics);

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box
        id="game"
        sx={{ width: '100%', height: '100%', background: '#bdbdbd' }}
      >
        <Game />
      </Box>

      <Box sx={{ position: 'absolute', bottom: '8px' }}>
        <Score />
      </Box>

      <Result />

      {showLyrics && lyrics.phrase !== '' && (
        <CaptionContainer
          sx={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className={notoSansJP.className}
        >
          <Typography variant="body1" sx={{ fontFamily: 'inherit' }}>
            {lyrics.phrase}
          </Typography>
        </CaptionContainer>
      )}
    </Box>
  );
}
