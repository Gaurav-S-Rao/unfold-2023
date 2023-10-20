import { ButtonBase, Card, CardContent, Typography } from '@mui/material';
import { useRouter } from 'src/routes/hooks';

type DeveloperGuideProps = {
  label: string;
  width?: string | number;
  height?: string | number;
};

export default function DeveloperGuideCard({
  label,
  width = 'auto',
  height = 'auto',
}: DeveloperGuideProps) {
  
  const { push } = useRouter()
  return (
    <Card
      variant="outlined"
      sx={{ margin: 1, width: width, height: height }}
      component={ButtonBase} 
      onClick={
        () => push('/dashboard/developer')
      }
    >
      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="h6">{label}</Typography>
      </CardContent>
    </Card>
  );
}
