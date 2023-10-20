import { Container } from '@mui/material';
import AdvertsPageViewHeading from '../adverts-page/adverts-page-view-heading';
import AdvertsPageViewContent from '../adverts-page/adverts-page-view-content';

export default function AdvertsPageView() {
  return (
    <Container sx={{ mt: '2%' }}>
      <AdvertsPageViewHeading />

      <AdvertsPageViewContent />
    </Container>
  );
}
