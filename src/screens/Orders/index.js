import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, Alert } from 'react-native';
import { Appbar, ActivityIndicator } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import RippleOrder from './components/RippleOrder';

const Orders = ({ route }) => {
  const auth = useAuth();
  const orders = useOrders();

  const handleAccept = (order) => {
    Alert.alert(
      'Terima Pesanan?',
      'Apakah kamu yakin ingin keluar menerima pesanan?',
      [{ text: 'Tidak' }, { text: 'Terima', onPress: () => acceptOrder(order) }]
    );
  };

  const acceptOrder = async (order) => {
    try {
      const client = order.users[0];
      const admin = {
        email: auth.user.email,
        id: auth.user.id,
        name: auth.user.name,
      };

      await firestore()
        .collection('pendingChatRooms')
        .doc(order.id)
        .update({
          id: order.id,
          status: 'accept',
          users: [admin, client],
        });
    } catch (error) {
      return { error };
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Pesanan" />
      </Appbar.Header>

      <ScrollView>
        {!orders && auth.user && (
          <>
            <Divider height={16} />
            <ActivityIndicator />
          </>
        )}

        {orders &&
          orders.map((order) => {
            if (order.status === 'accept') {
              return null;
            }

            return (
              <React.Fragment key={order.id}>
                <RippleOrder
                  name={order.name}
                  client={order.users[0].name}
                  duration={order.duration}
                  image={order.image}
                  timestamp={order.timestamp}
                  onPress={() => handleAccept(order)}
                />
                <Divider line />
              </React.Fragment>
            );
          })}
      </ScrollView>
    </>
  );
};

export default Orders;
