export const ROUTES = {
  home: '/home',
  summary: '/summary',
  aboutUs: '#aboutUs',
  shop: '#shop',
  contact: '#contact',
  login: '/',
};

export const getRoute = (route: keyof typeof ROUTES) => ROUTES[route];

