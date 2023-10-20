import { Box, Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import TopUpCard from 'src/components/Billing/top-up';

const dummycredits = 678;

export default function BillingPage({ credits = dummycredits }) {
  return (
    <>
      <Helmet>
        <title>Billing | SuiReach</title>
      </Helmet>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          mt: '5%',
        }}
      >
        <Box>
          <Typography variant="h5" sx={{ mb: '40px' }}>
            Hey! you have {credits} many credits left. Better not be late, top up now. 😉
          </Typography>
        </Box>

        <TopUpCard />
      </Container>
    </>
  );
}
