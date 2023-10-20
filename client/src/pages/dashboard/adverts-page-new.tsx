import { Helmet } from 'react-helmet-async';
import AdvertsPageNewView from 'src/sections/Dashboard/adverts-page/adverts-page-new-view';

export default function AdvertsPageNew() {
  return (
    <>
      <Helmet>
        <title>New Adverts | SuiReach</title>
      </Helmet>

      <AdvertsPageNewView />
    </>
  );
}
