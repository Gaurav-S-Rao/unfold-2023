import { forwardRef } from 'react';
import Link from '@mui/material/Link';
import Box, { BoxProps } from '@mui/material/Box';
import { RouterLink } from 'src/routes/components';
import { useSettingsContext } from '../settings';

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;
  type?: 'single' | 'full';
  sx?: any;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, type = 'single', sx, ...other }, ref) => {
    const settings = useSettingsContext();

    const logo = (
      <Box
        component="img"
        src={`/logo/logo_${type}_${settings.themeMode}.svg`}
        sx={{ width: type === 'single' ? 68 : 236, height: 50, cursor: 'pointer', ...sx }}
      />
    );

    if (disabledLink) {
      return logo;
    }

    return (
      <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default Logo;
