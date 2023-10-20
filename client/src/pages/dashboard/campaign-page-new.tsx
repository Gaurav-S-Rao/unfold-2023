import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import CampaignPageNewPageView from 'src/sections/Dashboard/campaign-page/campaign-page-new-page-view';

export default function CampaignPageNewPage() {
  const [params, setParams] = useSearchParams();

  const queryParam = params.get('advertId');

  return (
    <>
      <Helmet>
        <title>New Campaign | OrbReach</title>
      </Helmet>

      <CampaignPageNewPageView advertId={queryParam}/>
    </>
  );
}
