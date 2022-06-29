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
  const [user, setUser] = useState(null);

  const signIn = async () => {
    try {
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

  const signOut = async () => {
    try {
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
    const unsubscribe = auth().onAuthStateChanged(async (authState) => {
      setUser('authenticating');

      if (authState) {
        const userClaims = (await authState.getIdTokenResult()).claims;

        setUser({
          id: userClaims.user_id,
          name: userClaims.name,
          email: userClaims.email,
          avatar: userClaims.picture,
          role: userClaims.admin ? 'admin' : 'user',
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return { user, signIn, signOut };
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
