import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = async () => {
    try {
      const { idToken } = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);

      return await auth().signInWithCredential(credential);
    } catch (error) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.signOut();
      await auth().signOut();
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
