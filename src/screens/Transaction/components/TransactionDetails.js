import { format } from 'date-fns';
import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Divider from '../../../components/Divider';

const TransactionDetails = ({ transaction }) => {
  const { payment } = transaction;

  return (
    <>
      <View style={styles.container}>
        <Text>No. Pesanan</Text>
        <Text
          ellipsizeMode="middle"
          style={{ maxWidth: '50%' }}
          numberOfLines={1}
        >
          {transaction.id}
        </Text>
      </View>

      <Divider height={6} />
      <View style={styles.container}>
        <Text>Waktu Pemesanan</Text>
        <Text>{format(payment.createdAt, 'dd MMMM yyyy, HH:mm')}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

TransactionDetails.propTypes = {
  transaction: propTypes.shape({
    id: propTypes.string.isRequired,
    payment: propTypes.shape({
      createdAt: propTypes.number.isRequired,
    }),
  }),
};

export default TransactionDetails;
