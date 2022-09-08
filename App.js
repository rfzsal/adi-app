import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProvideAuth } from './src/hooks/useAuth';
import { ProvideUser } from './src/hooks/useUser';
import Stacks from './src/navigations/Stacks';

GoogleSignin.configure({
  webClientId:
    '924410929177-jqb2st4uf840oei6i73f9vj482omacj8.apps.googleusercontent.com',
});

const combinedDefaultTheme = {
  ...PaperDefaultTheme,
  ...NavigationDefaultTheme,
  colors: {
    ...PaperDefaultTheme.colors,
    ...NavigationDefaultTheme.colors,
    primary: '#0277BD',
    notification: Colors.blue400,
    background: Colors.white,
    surface: Colors.grey100,
    placeholder: Colors.grey300,
  },
};

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={combinedDefaultTheme}>
          <NavigationContainer theme={combinedDefaultTheme}>
            <ProvideAuth>
              <ProvideUser>
                <GestureHandlerRootView style={{ flex: 1 }}>
                  <Stacks />
                </GestureHandlerRootView>
              </ProvideUser>
            </ProvideAuth>
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>

      <StatusBar />
    </>
  );
};

export default App;
