export const APIKey = 'kodok';

export const server = 'https://bigboyz-app-4v6k5.ondigitalocean.app';

export const paymentAPI = (method) => {
  switch (method) {
    case 'create':
      return 'api/v1/payment';
    case 'cancel':
      return 'api/v1/payment/cancel';
  }
};

export const userAPI = (method) => {
  switch (method) {
    case 'save':
      return 'api/v1/user';
  }
};

export const notificationAPI = (method) => {
  switch (method) {
    case 'send':
      return 'api/v1/notification/send';
  }
};
