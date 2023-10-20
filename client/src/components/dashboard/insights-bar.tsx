import { Box, CircularProgress, Typography } from '@mui/material';

interface ChartProps {
  impressions: number;
  creditsLeft: number;
}

interface Props {
  title: string;
  chart: ChartProps;
}

export default function InsightsBar({ title, chart }: Props) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      padding={4}
    >
      <Box position="relative" display="inline-flex" marginTop={2}>
        <CircularProgress
          variant="determinate"
          value={chart.creditsLeft}
          size={220}
          thickness={3}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-90deg)',
          }}
        />
        <CircularProgress
          variant="determinate"
          value={chart.impressions}
          size={190}
          thickness={3}
          sx={{ transform: 'rotate(-90deg)' }}
          color="secondary"
        />
        <Box
          top={0}
          left={0}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
        >
          <Typography variant="caption" component="div" color="primary">
            Impressions: {chart.impressions}
          </Typography>
          <Typography variant="caption" component="div" color="secondary">
            Credits Left: {chart.creditsLeft}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
