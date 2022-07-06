import notifee from '@notifee/react-native';
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

import { ProvideAuth, useAuth } from './src/hooks/useAuth';
import { ProvideMessages } from './src/hooks/useMessages';
import { ProvideOrders } from './src/hooks/useOrders';
import { ProvideTransactions } from './src/hooks/useTransactions';
import Stacks from './src/navigations/Stacks';
import { handleNotification } from './src/utils/notifications';

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
    bubbleIn: Colors.grey300,
    bubbleOut: Colors.indigo50,
  },
};

notifee.onBackgroundEvent(async ({ type, detail }) => {
  //
});

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  const notification = JSON.parse(remoteMessage.data.notification);
  handleNotification(notification);
});

const NotificationHandlerContainer = ({ children }) => {
  const auth = useAuth();

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      const notification = JSON.parse(remoteMessage.data.notification);
      handleNotification(notification);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (auth.user?.role === 'admin') {
      messaging()
        .subscribeToTopic('new-orders')
        .catch(() => {});
    } else {
      messaging()
        .unsubscribeFromTopic('new-orders')
        .catch(() => {});
    }
  }, [auth.user]);

  return children;
};

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={combinedDefaultTheme}>
          <NavigationContainer theme={combinedDefaultTheme}>
            <ProvideAuth>
              <ProvideMessages>
                <ProvideOrders>
                  <ProvideTransactions>
                    <NotificationHandlerContainer>
                      <Stacks />
                    </NotificationHandlerContainer>
                  </ProvideTransactions>
                </ProvideOrders>
              </ProvideMessages>
            </ProvideAuth>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>

      <StatusBar />
    </>
  );
};

export default App;
