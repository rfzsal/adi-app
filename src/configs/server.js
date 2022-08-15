export const APIKey = 'kodok';

export const server = 'https://bigboyz-server.herokuapp.com';

export const paymentAPI = (method) => {
  switch (method) {
    case 'create':
      return 'api/v1/payment';
  }
};
