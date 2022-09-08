import currency from 'currency.js';
import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

import Divider from '../../../components/Divider';

const PriceDetails = ({ product }) => {
  const { price, discount } = product;

  const totalDiscount = discount;
  const totalPrice = totalDiscount ? price - totalDiscount : price;

  return (
    <>
      <View style={styles.container}>
        <Text>Harga total</Text>
        <Text style={styles.price}>
          {currency(price, {
            symbol: 'Rp ',
            precision: 0,
          }).format()}
        </Text>
      </View>

      {totalDiscount && (
        <>
          <Divider height={4} />
          <View style={styles.container}>
            <Text>Potongan harga</Text>
            <Text style={styles.price}>
              {`-${currency(totalDiscount, {
                symbol: 'Rp ',
                precision: 0,
              }).format()}`}
            </Text>
          </View>
        </>
      )}

      <Divider height={8} />
      <View style={styles.container}>
        <Text style={styles.subheading}>Total pembayaran</Text>
        <Text style={styles.totalPrice}>
          {currency(totalPrice, {
            symbol: 'Rp ',
            precision: 0,
          }).format()}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  price: { letterSpacing: 0.4 },
  subheading: { fontWeight: 'bold', letterSpacing: 0.4 },
  totalPrice: { fontSize: 16, fontWeight: 'bold', letterSpacing: 0.4 },
});

PriceDetails.propTypes = {
  product: propTypes.shape({
    price: propTypes.number.isRequired,
  }),
};

export default PriceDetails;
