import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect } from 'react';

import { useAuth } from '../hooks/useAuth';
import Checkout from '../screens/Checkout';
import InputProfile from '../screens/InputProfile';
import Login from '../screens/Login';
import MemberStatus from '../screens/MemberStatus';
import Midtrans from '../screens/Midtrans';
import Register from '../screens/Register';
import Transaction from '../screens/Transaction';
import TransactionsHistory from '../screens/TransactionsHistory';
import ViewCard from '../screens/ViewCard';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Auth = () => null;

const Stacks = () => {
  const auth = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if (auth.user === 'authenticating') {
      navigation.navigate('Auth');
    } else {
      navigation.navigate('Main');
    }
  }, [auth.user]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Tabs.User} />

      <Stack.Screen name="Login" component={Login} />

      <Stack.Screen name="Register" component={Register} />

      <Stack.Screen name="MemberStatus" component={MemberStatus} />

      {auth.user === 'authenticating' && (
        <Stack.Screen name="Auth" component={Auth} />
      )}

      {auth.user && <Stack.Screen name="Checkout" component={Checkout} />}

      {auth.user && <Stack.Screen name="Midtrans" component={Midtrans} />}

      {auth.user && <Stack.Screen name="Transaction" component={Transaction} />}

      {auth.user && (
        <Stack.Screen
          name="TransactionsHistory"
          component={TransactionsHistory}
        />
      )}

      {auth.user && <Stack.Screen name="ViewCard" component={ViewCard} />}

      {auth.user && (
        <Stack.Screen name="InputProfile" component={InputProfile} />
      )}
    </Stack.Navigator>
  );
};

export default Stacks;
