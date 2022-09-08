import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

import { getFCMToken, deleteFCMToken } from '../utils/notifications';
import {
  saveUser,
  updateUser,
  addFCMToken,
  removeFCMToken,
} from '../utils/users';

const AuthContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState('authenticating');

  const signIn = async () => {
    try {
      setUser('authenticating');

      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      const { user } = await auth().signInWithCredential(credential);

      const updateStatus = await updateUser(user.uid, {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });

      if (updateStatus.error) {
        await saveUser(user.uid, {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
      }

      const FCMToken = await getFCMToken();
      addFCMToken(user.uid, FCMToken);

      return true;
    } catch (error) {
      return { error };
    }
  };

  const signInEmail = async (email, password) => {
    try {
      setUser('authenticating');

      const { user } = await auth().signInWithEmailAndPassword(email, password);

      const updateStatus = await updateUser(user.uid, {
        name: user.email,
        email: user.email,
        avatar: user.photoURL,
      });

      if (updateStatus.error) {
        await saveUser(user.uid, {
          name: user.email,
          email: user.email,
          avatar: user.photoURL,
        });
      }

      const FCMToken = await getFCMToken();
      addFCMToken(user.uid, FCMToken);

      return true;
    } catch (error) {
      return { error };
    }
  };

  const signUpEmail = async (email, password) => {
    try {
      setUser('authenticating');

      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const updateStatus = await updateUser(user.uid, {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      });

      if (updateStatus.error) {
        await saveUser(user.uid, {
          name: user.displayName,
          email: user.email,
          avatar: user.photoURL,
        });
      }

      const FCMToken = await getFCMToken();
      addFCMToken(user.uid, FCMToken);

      return true;
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      setUser('authenticating');

      const FCMToken = await getFCMToken();
      deleteFCMToken();
      removeFCMToken(user.id, FCMToken);

      await GoogleSignin.signOut();
      await auth().signOut();

      return true;
    } catch (error) {
      return { error };
    }
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((authState) => {
      if (authState) {
        setUser({
          id: authState.uid,
          name: authState.displayName,
          email: authState.email,
          avatar: authState.photoURL,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, signIn, signInEmail, signOut, signUpEmail };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
