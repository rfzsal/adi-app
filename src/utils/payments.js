import firestore from '@react-native-firebase/firestore';
import axios from 'axios';

import { server, paymentAPI, APIKey } from '../configs/server';

export const getPayments = async () => {
  try {
    const data = await firestore()
      .collection('payments')
      .where('index', '>', -1)
      .get();
    if (data.empty) return [];

    return data.docs.map((payment) => payment.data());
  } catch (error) {
    return { error };
  }
};

export const getPaymentLink = async (parameter, transaction) => {
  try {
    const res = await axios.post(
      `${server}/${paymentAPI('create')}?key=${APIKey}`,
      {
        parameter,
        transaction,
      }
    );

    if (res.status === 200) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    return { error };
  }
};
