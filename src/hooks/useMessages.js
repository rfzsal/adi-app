import firestore from '@react-native-firebase/firestore';
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from './useAuth';

const MessagesContext = createContext(null);

export const useMessages = () => useContext(MessagesContext);

export const ProvideMessages = ({ children }) => {
  const messagesProvider = useProvideMessages();

  return (
    <MessagesContext.Provider value={messagesProvider}>
      {children}
    </MessagesContext.Provider>
  );
};

const useProvideMessages = () => {
  const auth = useAuth();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!auth.user) {
      setData(null);
      return;
    }

    const unsubscribe = firestore()
      .collection('users')
      .doc(auth.user.id)
      .collection('chatRooms')
      .onSnapshot((snapshot) => {
        const _chatRooms = snapshot.docs.map((chatRoom) => {
          return {
            id: chatRoom.id,
            ...chatRoom.data(),
          };
        });

        setData(
          _chatRooms.sort(
            (a, b) => b.latestMessage.timestamp - a.latestMessage.timestamp
          )
        );
      });

    return () => unsubscribe();
  }, [auth.user]);

  return data;
};
