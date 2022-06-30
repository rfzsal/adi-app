import firestore from '@react-native-firebase/firestore';
import { createContext, useContext, useEffect, useState } from 'react';

import { useAuth } from './useAuth';

const OrdersContext = createContext(null);

const useProvideOrders = () => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!auth.user) {
      setData(null);
      return;
    }

    if (auth.user === 'authenticating') {
      setData(null);
      return;
    }

    if (auth.user.role !== 'admin') {
      setData(null);
      return;
    }

    const onResult = (snapshot) => {
      const _data = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setData(_data);
    };

    const onError = (error) => {
      return { error };
    };

    const unsubscribe = firestore()
      .collection('pendingChatRooms')
      .onSnapshot(onResult, onError);

    return () => unsubscribe();
  }, [auth.user]);

  return data;
};

export const useOrders = () => {
  return useContext(OrdersContext);
};

export const ProvideOrders = ({ children }) => {
  const orders = useProvideOrders();

  return (
    <OrdersContext.Provider value={orders}>{children}</OrdersContext.Provider>
  );
};
