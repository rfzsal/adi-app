import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Colors } from 'react-native-paper';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Transactions from '../screens/Transactions';

const Tab = createMaterialBottomTabNavigator();

const Tabs = ({ children }) => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      shifting={false}
      activeColor={colors.primary}
      barStyle={{
        backgroundColor: colors.background,
        borderTopWidth: 0.2,
        borderTopColor: Colors.grey300,
      }}
    >
      {children}
    </Tab.Navigator>
  );
};

const User = () => {
  return (
    <Tabs>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Beranda',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-outline"
              color={color}
              size={24}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              color={color}
              size={24}
            />
          ),
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
    </Tabs>
  );
};

export default { User };
