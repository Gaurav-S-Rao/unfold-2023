import { Helmet } from 'react-helmet-async';
import AdvertsPageView from 'src/sections/Dashboard/view/adverts-page-view';

export default function AdvertsPage() {
  return (
    <>
      <Helmet>
        <title>Adverts | OrbReach</title>
      </Helmet>

      <AdvertsPageView />
    </>
  );
}
