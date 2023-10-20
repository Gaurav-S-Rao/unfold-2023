import { IconButton } from '@mui/material';
import { m } from 'framer-motion';
import { varHover } from 'src/components/animate';
import SvgColor from 'src/components/svg-color';

type Props = {
  icons: string[];
  options: string[];
  value: string;
  onChange: (newValue: string) => void;
};

export default function ToggleMode({ value, icons, onChange, options }: Props) {
  return (
    <IconButton
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(1.05)}
      color={'default'}
      onClick={() => onChange(options[options.indexOf(value) + 1] || options[0])}
      sx={{
        '& .svg-color': {
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.grey[500]} 0%, ${theme.palette.grey[600]} 100%)`,
        },
      }}
    >
      <SvgColor
        src={`/assets/icons/setting/ic_${icons[options.indexOf(value) + 1] || icons[0]}.svg`}
      />
    </IconButton>
  );
}
