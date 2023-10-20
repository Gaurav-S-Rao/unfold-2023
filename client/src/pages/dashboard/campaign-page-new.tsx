import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import CampaignPageNewPageView from 'src/sections/Dashboard/campaign-page/campaign-page-new-page-view';

export default function CampaignPageNewPage() {
  const params = useSearchParams();

  console.log('afsdasfd', params[0]);

  return (
    <>
      <Helmet>
        <title>New Campaign | Sui Reach</title>
      </Helmet>

      <CampaignPageNewPageView />
    </>
  );
}
