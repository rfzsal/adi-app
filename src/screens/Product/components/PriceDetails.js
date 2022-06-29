import currency from 'currency.js';
import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, Colors } from 'react-native-paper';

const PriceDetails = ({ price, discount }) => {
  const { colors } = useTheme();

  const totalPrice = discount > 0 ? price - price * (discount / 100) : price;

  return (
    <>
      <View style={styles.mainPriceContainer}>
        <Text style={styles.newPrice}>
          {currency(totalPrice, { symbol: 'Rp ', precision: 0 }).format()}
        </Text>

        {discount > 0 && (
          <Text
            style={[styles.promoBadge, { backgroundColor: colors.primary }]}
          >
            Hemat {discount}%
          </Text>
        )}
      </View>

      {discount > 0 && (
        <Text style={[styles.oldPrice, { color: colors.disabled }]}>
          {currency(price, { symbol: 'Rp ', precision: 0 }).format()}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainPriceContainer: { flexDirection: 'row', alignItems: 'center' },
  newPrice: { fontSize: 20, fontWeight: 'bold', letterSpacing: 0.4 },
  promoBadge: {
    top: 1,
    textAlign: 'center',
    fontSize: 12,
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    color: Colors.white,
    borderRadius: 8,
  },
  oldPrice: { textDecorationLine: 'line-through', fontSize: 16, marginTop: 2 },
});

PriceDetails.propTypes = {
  price: propTypes.number.isRequired,
  discount: propTypes.number,
};

PriceDetails.defaultProps = {
  discount: 0,
};

export default PriceDetails;
