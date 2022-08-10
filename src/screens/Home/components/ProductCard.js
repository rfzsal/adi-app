import currency from 'currency.js';
import propTypes from 'prop-types';
import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Text, TouchableRipple, useTheme } from 'react-native-paper';

const ProductCard = ({ product, onPress }) => {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const { name, prices, discounts, image } = product;

  const discount = discounts[0];
  const price = prices[0];
  const totalPrice = discount ? price - price * (discount / 100) : price;

  const dummyImage = `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
    colors.placeholder.split('#')[1]
  }`;

  return (
    <View style={styles.cardContainer}>
      <TouchableRipple style={styles.touchableContainer} onPress={onPress}>
        <View style={styles.innerCardContainer}>
          <View>
            <Image
              style={styles.cardImage}
              source={{ uri: image || dummyImage }}
              onLoadEnd={() => setIsLoaded(true)}
            />
            <View
              style={[
                styles.cardOverlay,
                {
                  backgroundColor: colors.backdrop,
                },
              ]}
            />

            {!isLoaded && (
              <View
                style={[
                  styles.cardPlaceholder,
                  {
                    backgroundColor: colors.placeholder,
                  },
                ]}
              >
                <Text style={{ color: colors.placeholderText }}>{name}</Text>
              </View>
            )}
          </View>

          <Text style={styles.cardTitle} numberOfLines={2}>
            {name}
          </Text>

          <View style={styles.cardBottomContainer}>
            <Text style={[styles.cardBottomText, { color: colors.lightText }]}>
              Mulai dari
            </Text>

            <View style={styles.cardPriceContainer}>
              <Text style={styles.cardNewPrice}>
                {currency(totalPrice, { symbol: 'Rp ', precision: 0 }).format()}
              </Text>

              {discount > 0 && (
                <Text style={[styles.cardOldPrice, { color: colors.disabled }]}>
                  {currency(price, { symbol: '', precision: 0 }).format()}
                </Text>
              )}
            </View>
          </View>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
    minWidth: 160,
    minHeight: 240,
    overflow: 'hidden',
  },
  touchableContainer: { height: 240, paddingBottom: 4 },
  innerCardContainer: { flex: 1 },
  cardImage: { height: 140, borderRadius: 8 },
  cardOverlay: {
    opacity: 0.24,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 8,
  },
  cardPlaceholder: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: { paddingHorizontal: 8, letterSpacing: 0.4, marginTop: 8 },
  cardBottomContainer: {
    position: 'absolute',
    bottom: 8,
    paddingHorizontal: 8,
  },
  cardBottomText: { fontSize: 12 },
  cardPriceContainer: { flexDirection: 'row', alignItems: 'center' },
  cardNewPrice: {
    fontWeight: 'bold',
    marginRight: 8,
    fontSize: 16,
    letterSpacing: 0.4,
  },
  cardOldPrice: { textDecorationLine: 'line-through' },
});

ProductCard.propTypes = {
  product: propTypes.shape({
    name: propTypes.string.isRequired,
    prices: propTypes.arrayOf(propTypes.number).isRequired,
    discounts: propTypes.arrayOf(propTypes.number),
    image: propTypes.string,
  }),
  onPress: propTypes.func,
};

ProductCard.defaultProps = {
  onPress: () => {},
};

export default ProductCard;
