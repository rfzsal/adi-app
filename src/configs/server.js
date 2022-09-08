export const APIKey = 'kodok';

export const server = 'https://adi-apps.alphabetincubator.id';

export const paymentAPI = (method) => {
  switch (method) {
    case 'create':
      return 'api/v1/payment';
  }
};
