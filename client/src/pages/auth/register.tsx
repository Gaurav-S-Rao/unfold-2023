import { Helmet } from 'react-helmet-async';
import RegisterView from 'src/sections/onboard/view/register-view';

export default function RegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register | SuiReach</title>
      </Helmet>
      
      <RegisterView />
    </>
  );
}
