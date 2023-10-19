// routes
import { paths } from 'src/routes/paths';
import { IuserTypes } from './types/user';

// API
export const HOST_API = import.meta.env.VITE_HOST_API;
export const PRICE_API = import.meta.env.VITE_PRICE_API;
export const ASSETS_API = import.meta.env.VITE_ASSETS_API;

// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = paths.dashboard.root; // as '/dashboard'

export const STORAGE_KEY = 'accessToken';

export const NONCE_TOKEN_KEY = 'nonceToken';

export const COMPANY_CATEGORY_LIST = [
  {
    value: 'e-com',
    label: 'E-Commerce',
  },
  {
    value: 'fintech',
    label: 'Fintech',
  },
  {
    value: 'healthcare',
    label: 'Healthcare',
  },
  {
    value: 'education',
    label: 'Education',
  },
  {
    value: 'travel',
    label: 'Travel',
  },
  {
    value: 'other',
    label: 'Other',
  },
];

export const COMPANY_TYPE_LIST = [
  {
    value: 'startup',
    label: 'Startup',
  },
  {
    value: 'enterprise',
    label: 'Enterprise',
  },
  {
    value: 'agency',
    label: 'Agency',
  },
  {
    value: 'freelancer',
    label: 'Freelancer',
  },
  {
    value: 'blog',
    label: 'Blog',
  },
];

export const userTypes: IuserTypes[] = [
  {
    label: 'Advertiser',
    role: 'advertiser',
  },
  {
    label: 'Publisher',
    role: 'publisher',
  },
];
