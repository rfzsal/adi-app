import firestore from '@react-native-firebase/firestore';
import React from 'react';
import { ScrollView, View, Text, Alert, Image, StyleSheet } from 'react-native';
import { Appbar, useTheme } from 'react-native-paper';

import noTransactions from '../../../assets/images/no-transactions.png';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';
import RippleOrder from './components/RippleOrder';

const Orders = () => {
  const { colors } = useTheme();
  const auth = useAuth();
  const orders = useOrders();

  const pendingOrders = orders?.filter((order) => order.status !== 'accept');

  const handleAccept = (order) => {
    const acceptOrder = async () => {
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

    Alert.alert(
      'Terima Pesanan?',
      'Apakah kamu yakin ingin keluar menerima pesanan?',
      [{ text: 'Tidak' }, { text: 'Terima', onPress: acceptOrder }]
    );
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content title="Pesanan" />
      </Appbar.Header>

      {(!orders || pendingOrders?.length === 0) && (
        <View style={styles.vectorContainer}>
          <Image style={styles.vectorImage} source={noTransactions} />

          <Text style={styles.vectorText}>Belum ada pesanan saat ini</Text>
        </View>
      )}

      {pendingOrders?.length > 0 && (
        <ScrollView>
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  vectorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 48,
  },
  vectorImage: { height: 240, resizeMode: 'contain' },
  vectorText: { fontSize: 16, marginTop: 16, marginBottom: 24 },
});

export default Orders;
