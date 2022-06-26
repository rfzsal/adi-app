import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../hooks/useAuth';
import Landing from '../screens/Landing';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  const auth = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {auth.user ? (
        <Stack.Screen name="Tabs" component={Tabs} />
      ) : (
        <Stack.Screen name="Landing" component={Landing} />
      )}
    </Stack.Navigator>
  );
};

export default Stacks;
