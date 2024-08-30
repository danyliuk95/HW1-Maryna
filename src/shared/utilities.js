export const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const ROUTES = {
  ORDERING: '/',
  CREATE_PRODUCT: '/create-product',
  CREATE_MODIFIER: '/create-modifier',
};

export const BASE_URL = 'http://localhost:5001';
