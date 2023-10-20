import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import { m } from 'framer-motion';
import { useRouter } from 'src/routes/hooks';

type BillingCardProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function BillingCard({ label, width = 'auto', height = 'auto' }: BillingCardProps) {
  const { push } = useRouter();

  const handleButtonClick = () => {
    push('/dashboard/billing');
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase}
      onClick={handleButtonClick}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
    </Card>
  );
}
