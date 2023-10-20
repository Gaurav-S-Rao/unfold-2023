import { Helmet } from 'react-helmet-async';
import LoginPageView from 'src/sections/onboard/view/login-view';

export default function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login | SuiReach</title>
      </Helmet>

      <LoginPageView />
    </>
  );
}
