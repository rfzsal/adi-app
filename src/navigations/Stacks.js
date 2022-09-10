import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import Checkout from '../screens/Checkout';
import InputProfile from '../screens/InputProfile';
import MemberStatus from '../screens/MemberStatus';
import Midtrans from '../screens/Midtrans';
import Transaction from '../screens/Transaction';
import TransactionsHistory from '../screens/TransactionsHistory';
import ViewCard from '../screens/ViewCard';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={Tabs.User} />

      {auth.user && <Stack.Screen name="Checkout" component={Checkout} />}

      {auth.user && <Stack.Screen name="Midtrans" component={Midtrans} />}

      {auth.user && (
        <Stack.Screen name="MemberStatus" component={MemberStatus} />
      )}

      {auth.user && <Stack.Screen name="ViewCard" component={ViewCard} />}

      {auth.user && <Stack.Screen name="Transaction" component={Transaction} />}

      {auth.user && (
        <Stack.Screen
          name="TransactionsHistory"
          component={TransactionsHistory}
        />
      )}

      {auth.user && (
        <Stack.Screen name="InputProfile" component={InputProfile} />
      )}
    </Stack.Navigator>
  );
};

export default Stacks;
