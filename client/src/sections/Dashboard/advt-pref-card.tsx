import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

type AdvtPrefCardProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function AdvtPrefCard({
  label,
  width = 'auto',
  height = 'auto',
}: AdvtPrefCardProps) {
  const { push } = useRouter();

  const handleClick = () => {
    push('/dashboard/adverts');
  };

  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase}
      onClick={handleClick}
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
    </Card>
  );
}
