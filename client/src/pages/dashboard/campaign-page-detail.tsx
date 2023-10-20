import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import CampaignPageDetailView from 'src/sections/Dashboard/adverts-page/campaign-page-detail-view';
import { Container } from '@mui/material';

export default function CampaignPageDetailPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title>Campaign Detail | Orb Reach</title>
      </Helmet>
      <Container sx={{ mt: '2%' }}>
        <CampaignPageDetailView id={id} />
      </Container>
    </>
  );
}
