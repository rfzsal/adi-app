import currency from 'currency.js';
import propTypes from 'prop-types';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const OrderDetails = ({ product }) => {
  const { colors } = useTheme();
  const { name, price, variant, image } = product;

  const dummyImage = `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
    colors.primary.split('#')[1]
  }`;

  return (
    <View style={styles.mainContainer}>
      <Image style={styles.image} source={{ uri: image || dummyImage }} />

      <View style={styles.detailContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {name}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {currency(price, {
              symbol: 'Rp ',
              precision: 0,
            }).format()}
          </Text>

          {variant && <Text style={styles.variant}>{`Paket ${variant}`}</Text>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: { height: 64, width: 64, marginRight: 16 },
  detailContainer: { flex: 1 },
  title: { letterSpacing: 0.4 },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: { fontWeight: 'bold', letterSpacing: 0.4, marginTop: 2 },
  variant: { fontSize: 12 },
});

OrderDetails.propTypes = {
  product: propTypes.shape({
    name: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    variant: propTypes.string,
    image: propTypes.string,
  }),
};

export default OrderDetails;
