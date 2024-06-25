import { Box, BoxProps, styled, Typography } from '@mui/material';

import { useAppStore } from '../AppStoreProvider';
import { Game } from '../game/Game';

const CaptionContainer = styled(Box)<BoxProps>(({ theme }) => ({
  backgroundColor: theme.palette.grey[900],
  color: '#fff',
  opacity: '75%',
  padding: '8px 16px',
  borderRadius: '4px',
}));

export function PlayerScreen(): JSX.Element {
  const text = useAppStore(state => state.text);
  const showLyrics = useAppStore(state => state.showLyrics);

  return (
    <Box sx={{ height: '100%', position: 'relative' }}>
      <Box
        id="game"
        sx={{ width: '100%', height: '100%', background: '#bdbdbd' }}
      >
        <Game />
      </Box>
      {showLyrics && text !== '' && (
        <CaptionContainer
          sx={{
            position: 'absolute',
            bottom: '16px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <Typography variant="body1">{text}</Typography>
        </CaptionContainer>
      )}
    </Box>
  );
}
