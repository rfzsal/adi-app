import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Colors } from 'react-native-paper';

import { useMessages } from '../hooks/useMessages';
import { useOrders } from '../hooks/useOrders';
import { useTransactions } from '../hooks/useTransactions';
import Home from '../screens/Home';
import Messages from '../screens/Messages';
import Orders from '../screens/Orders';
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

const Admin = () => {
  const messages = useMessages();
  const orders = useOrders();

  const isNewMessagesExist =
    messages?.filter((message) => message.counter > 0).length > 0;

  const isNewOrdersExist = orders?.length > 0;

  return (
    <Tabs>
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
          tabBarBadge: isNewMessagesExist,
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
          tabBarBadge: isNewOrdersExist,
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

const User = () => {
  const messages = useMessages();
  const transactions = useTransactions();

  const isNewMessagesExist =
    messages?.filter((message) => message.counter > 0).length > 0;

  const isNewTransactionsExist =
    transactions?.filter(
      (transaction) => transaction.payment.status === 'Menunggu Pembayaran'
    ).length > 0;

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
          tabBarBadge: isNewMessagesExist,
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
          tabBarBadge: isNewTransactionsExist,
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

export default { Admin, User };
