import { alpha, Shadows } from '@mui/material/styles';
import { palette as themePalette } from './palette';

const palette = themePalette('light');

const LIGHT_MODE = palette.grey[500];

const DARK_MODE = palette.common.black;

function createShadow(color: string): Shadows {
  const transparent1 = alpha(color, 0.2);
  const transparent2 = alpha(color, 0.16);
  const transparent3 = alpha(color, 0.18);
  return [
    'none',
    `0px 2px 1.2px -1.2px ${transparent1},0px 1.2px 1.2px 0px ${transparent2},0px 1.2px 3.8px 0px ${transparent3}`,
    `0px 3.8px 1.2px -2px ${transparent1},0px 2px 2px 0px ${transparent2},0px 1.2px 5px 0px ${transparent3}`,
    `0px 3.8px 3.8px -2px ${transparent1},0px 3.8px 3.8px 0px ${transparent2},0px 1.2px 8px 0px ${transparent3}`,
    `0px 2px 3.8px -1.2px ${transparent1},0px 3.8px 5px 0px ${transparent2},0px 1.2px 10px 0px ${transparent3}`,
    `0px 3.8px 5px -1.2px ${transparent1},0px 5px 8px 0px ${transparent2},0px 1.2px 13.8px 0px ${transparent3}`,
    `0px 3.8px 5px -1.2px ${transparent1},0px 6px 10px 0px ${transparent2},0px 1.2px 18px 0px ${transparent3}`,
    `0px 3.8px 5px -2px ${transparent1},0px 7px 10px 1.2px ${transparent2},0px 2px 16px 1.2px ${transparent3}`,
    `0px 5px 5px -3.8px ${transparent1},0px 8px 10px 1.2px ${transparent2},0px 3.8px 13.8px 2px ${transparent3}`,
    `0px 5px 6px -3.8px ${transparent1},0px 9px 12px 1.2px ${transparent2},0px 3.8px 16px 2px ${transparent3}`,
    `0px 6px 6px -3.8px ${transparent1},0px 10px 13.8px 1.2px ${transparent2},0px 3.8px 18px 3.8px ${transparent3}`,
    `0px 6px 7px -3.8px ${transparent1},0px 11.2px 15px 1.2px ${transparent2},0px 3.8px 20px 3.8px ${transparent3}`,
    `0px 7px 8px -3.8px ${transparent1},0px 12px 17px 2px ${transparent2},0px 5px 22px 3.8px ${transparent3}`,
    `0px 7px 8px -3.8px ${transparent1},0px 13.8px 19px 2px ${transparent2},0px 5px 23.8px 3.8px ${transparent3}`,
    `0px 7px 9px -3.8px ${transparent1},0px 13.8px 21.2px 2px ${transparent2},0px 5px 26px 3.8px ${transparent3}`,
    `0px 8px 9px -5px ${transparent1},0px 15px 22px 2px ${transparent2},0px 6px 28px 5px ${transparent3}`,
    `0px 8px 10px -5px ${transparent1},0px 16px 23.8px 2px ${transparent2},0px 6px 30px 5px ${transparent3}`,
    `0px 8px 11.2px -5px ${transparent1},0px 17px 26px 2px ${transparent2},0px 6px 32px 5px ${transparent3}`,
    `0px 9px 11.2px -5px ${transparent1},0px 18px 28px 2px ${transparent2},0px 7px 33.8px 6px ${transparent3}`,
    `0px 9px 12px -6px ${transparent1},0px 19px 29px 2px ${transparent2},0px 7px 36px 6px ${transparent3}`,
    `0px 10px 13.8px -6px ${transparent1},0px 20px 31.2px 3.8px ${transparent2},0px 8px 38px 7px ${transparent3}`,
    `0px 10px 13.8px -6px ${transparent1},0px 21.2px 33.8px 3.8px ${transparent2},0px 8px 40px 7px ${transparent3}`,
    `0px 10px 13.8px -6px ${transparent1},0px 22px 35px 3.8px ${transparent2},0px 8px 42px 7px ${transparent3}`,
    `0px 11.2px 13.8px -7px ${transparent1},0px 23.8px 36px 3.8px ${transparent2},0px 9px 43.8px 8px ${transparent3}`,
    `0px 11.2px 15px -7px ${transparent1},0px 23.8px 38px 3.8px ${transparent2},0px 9px 46px 8px ${transparent3}`,
  ];
}

export function shadows(mode: 'light' | 'dark') {
  return mode === 'light' ? createShadow(LIGHT_MODE) : createShadow(DARK_MODE);
}
