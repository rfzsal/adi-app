import firestore from '@react-native-firebase/firestore';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, Appbar } from 'react-native-paper';

import { useAuth } from '../../hooks/useAuth';
import { useOrders } from '../../hooks/useOrders';

const Orders = ({ route }) => {
  const auth = useAuth();
  const orders = useOrders();

  const handleAccept = async (order) => {
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

      <ScrollView style={styles.mainContainer}>
        {orders &&
          orders.map((order) => {
            if (order.status === 'accept') {
              return null;
            }

            return (
              <Button
                key={order.id}
                mode="contained"
                style={styles.button}
                onPress={() => handleAccept(order)}
              >
                {order.name}
              </Button>
            );
          })}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: 16 },
  centeredText: { textAlign: 'center' },
  button: { marginBottom: 8 },
});

export default Orders;
