import { GoogleSignin } from '@react-native-google-signin/google-signin';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  Colors,
} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Stacks from './src/navigations/Stacks';

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
  },
};

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <PaperProvider theme={combinedDefaultTheme}>
          <NavigationContainer theme={combinedDefaultTheme}>
            <Stacks />
          </NavigationContainer>
        </PaperProvider>
      </SafeAreaProvider>

      <StatusBar />
    </>
  );
};

export default App;
