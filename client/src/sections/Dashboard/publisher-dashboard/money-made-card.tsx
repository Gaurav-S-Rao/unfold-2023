import { ButtonBase, Card, CardContent, Typography, Box } from '@mui/material';

type MoneyMadeCardProps = {
  label: string;
  totalAdds: number;
  moneyEarned: number;
  width?: string | number;
  height?: string | number;
};

export default function MoneyMadeCard({
  label,
  totalAdds,
  moneyEarned,
  width = 'auto',
  height = 'auto',
}: MoneyMadeCardProps) {
  return (
    <Card
      variant="outlined"
      sx={{
        margin: 1,
        width: width,
        height: height,
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      component={ButtonBase}
    >
      <CardContent
        sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography variant="h6" gutterBottom>
          {label}
        </Typography>

        <Box sx={{ width: '100%', mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Total Adds Run</Typography>
          <Typography variant="h6">{totalAdds}</Typography>
        </Box>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="subtitle1">Money Earned</Typography>
          <Typography variant="h6">SUI {moneyEarned}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
