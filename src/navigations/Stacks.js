import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import Checkout from '../screens/Checkout';
import Landing from '../screens/Landing';
import Midtrans from '../screens/Midtrans';
import Product from '../screens/Product';
import Products from '../screens/Products';
import Promos from '../screens/Promos';
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
        <Stack.Screen name="Promos" component={Promos} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Products" component={Products} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Product" component={Product} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Checkout" component={Checkout} />
      )}

      {auth.user?.role === 'user' && (
        <Stack.Screen name="Midtrans" component={Midtrans} />
      )}

      {auth.user?.role === 'admin' && (
        <Stack.Screen name="Main" component={Tabs.Admin} />
      )}
    </Stack.Navigator>
  );
};

export default Stacks;
