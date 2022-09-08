import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import Checkout from '../screens/Checkout';
import Login from '../screens/Login';
import Midtrans from '../screens/Midtrans';
import ProfileUpdate from '../screens/ProfileUpdate';
import Register from '../screens/Register';
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

      {auth.user && <Stack.Screen name="ViewCard" component={ViewCard} />}

      {auth.user && (
        <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} />
      )}

      {!auth.user && <Stack.Screen name="Login" component={Login} />}

      {!auth.user && <Stack.Screen name="Register" component={Register} />}
    </Stack.Navigator>
  );
};

export default Stacks;
