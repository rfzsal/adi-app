import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './useAuth';

const TransactionsContext = createContext(null);

export const useTransactions = () => useContext(TransactionsContext);

export const ProvideTransactions = ({ children }) => {
  const transactionsProvider = useProvideTransactions();

  return (
    <TransactionsContext.Provider value={transactionsProvider}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useProvideTransactions = () => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!auth.user) {
      setData(null);
      return;
    }

    const unsubscribe = firestore()
      .collection('transactions')
      .where('user.id', '==', auth.user.id)
      .onSnapshot((snapshot) => {
        const _transactions = [];
        snapshot.forEach((transaction) =>
          _transactions.push({ id: transaction.id, ...transaction.data() })
        );

        setData(
          _transactions
            .filter(
              (transaction) => transaction.payment.status !== 'Sedang Diproses'
            )
            .sort((a, b) => b.payment.createdAt - a.payment.createdAt)
        );
      });

    return () => unsubscribe();
  }, [auth.user]);

  return data;
};
