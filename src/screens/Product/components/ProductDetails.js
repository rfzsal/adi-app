import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const ProductDetails = ({ children }) => {
  return (
    <>
      <Text style={styles.header}>Deskripsi</Text>
      <Text>{children}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
    letterSpacing: 0.4,
  },
});

ProductDetails.propTypes = {
  children: propTypes.string.isRequired,
};

export default ProductDetails;
