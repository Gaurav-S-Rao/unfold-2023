export type IUserItem = {
  id: string;
  evm_address: string;
  sui_address: string;
  company_name: string;
  company_type: string;
  company_category: string;
  website: string;
};

export type IuserTypes = {
  label: string;
  role?: 'advertiser' | 'publisher';
};
