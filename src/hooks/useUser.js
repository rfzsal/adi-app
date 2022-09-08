import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './useAuth';

const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);

export const ProvideUser = ({ children }) => {
  const userProvider = useProvideUser();

  return (
    <UserContext.Provider value={userProvider}>{children}</UserContext.Provider>
  );
};

const useProvideUser = () => {
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

    const unsubscribe = firestore()
      .collection('users')
      .doc(auth.user.id)
      .onSnapshot((snapshot) => {
        setData(snapshot.data());
      });

    return () => unsubscribe();
  }, [auth.user]);

  return data;
};
