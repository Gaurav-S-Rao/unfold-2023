import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import { useRouter } from 'src/routes/hooks';
import DeveloperTimeline from 'src/sections/Dashboard/publisher-dashboard/developer-timeline';
import axiosInstance, { endpoints } from 'src/utils/axios-instance';

export default function DeveloperPage() {
  const { push } = useRouter();

  const [authApi, setAuthApi] = useState<Record<string, any> | undefined>();

  useEffect(() => {
    axiosInstance
      .get(endpoints.apiKey.get)
      .then((res) => {
        res.data === '' ? setAuthApi(undefined) : setAuthApi(res.data);
      })
      .catch((err) => {
        console.log('🚀 ~ file: developer-project-new.tsx ~ line 118 ~ handleSubmit ~ err', err);
      });
  }, []);
  return (
    <>
      <Helmet>
        <title>Developer | Publisher Portal</title>
      </Helmet>

      <Container
        sx={{
          mt: 5,
        }}
      >
        <CustomBreadcrumbs
          heading=" Projects "
          links={[{}]}
          action={
            <Button variant="contained" onClick={() => push('/dashboard/developer/new')}>
              {authApi ? 'View My API' : 'New Project'}
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
