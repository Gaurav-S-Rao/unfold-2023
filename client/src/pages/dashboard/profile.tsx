import { Helmet } from 'react-helmet-async';
import ProfileView from 'src/sections/Dashboard/profile-view';

export default function Profile() {
  return (
    <>
      <Helmet>
        <title>Profile | Sui Reach</title>
      </Helmet>

      <ProfileView />
    </>
  );
}
