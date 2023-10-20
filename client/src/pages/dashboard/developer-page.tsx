import { Typography, Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useRouter } from 'src/routes/hooks';
import DeveloperTimeline from 'src/sections/Dashboard/publisher-dashboard/developer-timeline';

export default function DeveloperPage() {
  const { push } = useRouter();
  return (
    <>
      <Container>
        <CustomBreadcrumbs
          heading=" Projects "
          links={[{}]}
          action={
            <Button variant="contained" onClick={() => push('/dashboard/developer/new')}>
              New Project
            </Button>
          }
        />
        <Box>
          <DeveloperTimeline />
        </Box>
      </Container>
    </>
  );
}
