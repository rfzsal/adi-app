import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Landing from '../screens/Landing';
import Tabs from './Tabs';

const Stack = createNativeStackNavigator();

const Stacks = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Stacks;
