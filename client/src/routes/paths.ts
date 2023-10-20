const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  page404: '/404',
  auth: {
    root: ROOTS.AUTH,
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
    forgotPassword: `${ROOTS.AUTH}/forgot-password`,
    resetPassword: `${ROOTS.AUTH}/reset-password`,
  },
  dashboard: {
    root: ROOTS.DASHBOARD,
    home: `${ROOTS.DASHBOARD}/home`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    billing: `${ROOTS.DASHBOARD}/billing`,
    adverts: {
      root: `${ROOTS.DASHBOARD}/adverts`,
      new: `${ROOTS.DASHBOARD}/adverts/new`,
      edit: `${ROOTS.DASHBOARD}/adverts/edit`,
      details: (id: string) => `${ROOTS.DASHBOARD}/adverts/${id}`,
    },
    campaign: {
      root: `${ROOTS.DASHBOARD}/campaign`,
      new: (advertId: string) => `${ROOTS.DASHBOARD}/campaign/new?advertId=${advertId}`,
      
      edit: `${ROOTS.DASHBOARD}/campaign/edit`,
      details: (id: string) => `${ROOTS.DASHBOARD}/campaign/${id}`,
    },
    developer: {
      root: `${ROOTS.DASHBOARD}/developer`,
      new: `${ROOTS.DASHBOARD}/developer/new`,
      details: (id: string) => `${ROOTS.DASHBOARD}/developer/${id}`,
    },
  },
};
