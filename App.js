import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProvideAuth } from './src/hooks/useAuth';
import Stacks from './src/navigations/Stacks';

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  // console.log('A new FCM message handled in the background!', remoteMessage);
});

GoogleSignin.configure({
  webClientId:
    '572898112377-9rerjimebd9a23kde80pbscre2tcumv6.apps.googleusercontent.com',
});

const combinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: Colors.indigo400,
    notification: Colors.indigo300,
    background: Colors.white,
    surface: Colors.grey100,
  },
};

const NotificationHandlerContainer = ({ children }) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      // console.log('A new FCM message handled in the foreground!', remoteMessage);
    });

    return () => unsubscribe();
  }, []);

  return children;
};

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={combinedDefaultTheme}>
          <NavigationContainer theme={combinedDefaultTheme}>
            <ProvideAuth>
              <NotificationHandlerContainer>
                <Stacks />
              </NotificationHandlerContainer>
            </ProvideAuth>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>

      <StatusBar />
    </>
  );
};

export default App;
