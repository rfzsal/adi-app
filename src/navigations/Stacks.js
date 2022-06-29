import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import Checkout from '../screens/Checkout';
import Landing from '../screens/Landing';
import Product from '../screens/Product';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {(!auth.user || auth.user === 'authenticating') && (
        <Stack.Screen name="Landing" component={Landing} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Main" component={Tabs.User} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Product" component={Product} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Checkout" component={Checkout} />
      )}

      {auth.user?.role === 'admin' && (
        <Stack.Screen name="Main" component={Tabs.Admin} />
      )}
    </Stack.Navigator>
  );
};

export default Stacks;
