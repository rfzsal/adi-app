export const APIKey = 'kodok';

export const server = 'https://bigboyz-app-4v6k5.ondigitalocean.app';

export const paymentAPI = (method) => {
  switch (method) {
    case 'create':
      return 'api/v1/payment';
  }
};
