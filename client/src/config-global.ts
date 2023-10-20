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
    value: 'blockchain',
    label: 'Blockchain',
  },
  {
    value: 'cryptocurrency',
    label: 'Cryptocurrency',
  },
  {
    value: 'decentralized-finance',
    label: 'Decentralized Finance',
  },
  {
    value: 'smart-contracts',
    label: 'Smart Contracts',
  },
  {
    value: 'non-fungible-tokens',
    label: 'Non-Fungible Tokens',
  },
  {
    value: 'virtual-reality',
    label: 'Virtual Reality',
  },
  {
    value: 'augmented-reality',
    label: 'Augmented Reality',
  },
  {
    value: 'internet-of-things',
    label: 'Internet of Things',
  },
  {
    value: 'artificial-intelligence',
    label: 'Artificial Intelligence',
  },
  {
    value: 'machine-learning',
    label: 'Machine Learning',
  },
  {
    value: 'data-analytics',
    label: 'Data Analytics',
  },
  {
    value: 'cyber-security',
    label: 'Cyber Security',
  },
  {
    value: 'cloud-computing',
    label: 'Cloud Computing',
  },
  {
    value: '5g-technology',
    label: '5G Technology',
  },
  {
    value: 'gaming',
    label: 'Gaming',
  },
  {
    value: 'content-creation',
    label: 'Content Creation',
  },
  {
    value: 'social-media',
    label: 'Social Media',
  },
  {
    value: 'sustainability',
    label: 'Sustainability',
  },
  {
    value: 'remote-work',
    label: 'Remote Work',
  },
  {
    value: 'automation',
    label: 'Automation',
  },
  {
    value: 'digital-identity',
    label: 'Digital Identity',
  },
  {
    value: 'quantum-computing',
    label: 'Quantum Computing',
  },
  {
    value: 'open-source',
    label: 'Open Source',
  },
  {
    value: 'web-development',
    label: 'Web Development',
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
