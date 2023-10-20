import { Container } from '@mui/material';
import ReachCard from '../_common/reach-card';

export default function CampaignPageNewPageView() {
  const listItems = [
    {
      id: '1',
      title: 'title',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_1.jpg',
      description: 'description',
    },
    {
      id: '2',
      title: 'tifasdtle',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_3.jpg',
      description: 'descrfasdfaiption',
    },
    {
      id: '3',
      title: 'tifasdtle',
      image: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_2.jpg',
      description: 'descrfasdfaiption',
    },
  ];

  return (
    <Container>
      <h1>Campaign Page New</h1>

      <ReachCard
        list={listItems}
        sx={{
          maxWidth: 500,
        }}
      />
    </Container>
  );
}
