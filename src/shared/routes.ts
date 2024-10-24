export const ROUTES = {
  home: '/',
  summary: '/summary',
  aboutUs: '#aboutUs',
  shop: '#shop',
  contact: '#contact',
};

export const getRoute = (route: keyof typeof ROUTES) => ROUTES[route];

