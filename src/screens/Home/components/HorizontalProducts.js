import { useNavigation } from '@react-navigation/native';
import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

import ProductCard from './ProductCard';

const HorizontalProducts = ({ products, itemDimension }) => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <ProductCard
        product={item}
        onPress={() =>
          navigation.navigate('Product', {
            productId: item.id,
            productName: item.name,
            productPrice: item.prices[0],
            productDiscount: item.discounts[0],
          })
        }
      />
    );
  };

  return (
    <FlatGrid
      style={styles.container}
      itemContainerStyle={styles.itemContainer}
      itemDimension={itemDimension}
      showsHorizontalScrollIndicator={false}
      horizontal
      spacing={16}
      data={products}
      renderItem={renderItem}
      maxItemsPerRow={1}
    />
  );
};

const styles = StyleSheet.create({
  container: { minHeight: 256, maxHeight: 256 },
  itemContainer: { maxWidth: 160 },
});

HorizontalProducts.propTypes = {
  products: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string.isRequired,
      prices: propTypes.arrayOf(propTypes.number).isRequired,
      discount: propTypes.number,
      image: propTypes.string,
    })
  ),
  itemDimension: propTypes.number,
};

HorizontalProducts.defaultProps = {
  itemDimension: 160,
};

export default HorizontalProducts;
