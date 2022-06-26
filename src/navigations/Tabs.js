import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Colors } from 'react-native-paper';

import Messages from '../screens/Messages';
import Orders from '../screens/Orders';
import Profile from '../screens/Profile';

const Tab = createMaterialBottomTabNavigator();

const Tabs = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.background,
        borderTopWidth: 0.2,
        borderTopColor: Colors.grey300,
      }}
    >
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: 'Pesan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="message-outline"
              color={color}
              size={24}
            />
          ),
          tabBarBadge: true,
        }}
      />

      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarLabel: 'Pesanan',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="clipboard-outline"
              color={color}
              size={24}
            />
          ),
          tabBarBadge: true,
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profil',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
