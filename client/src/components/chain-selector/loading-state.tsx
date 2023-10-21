import { Box, CircularProgress } from '@mui/material';

export default function LoadingState() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ml: 1,
      }}
    >
      <CircularProgress size={14} />
    </Box>
  );
}
