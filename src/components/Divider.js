import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const Divider = ({ line, height }) => {
  return (
    <View style={styles.dividerContainer}>
      {line ? (
        <View style={styles.dividerLine} />
      ) : (
        <View style={[{ height }]} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dividerContainer: { paddingHorizontal: 16 },
  dividerLine: { height: 1, backgroundColor: Colors.grey100 },
});

Divider.propTypes = {
  line: propTypes.bool,
  height: propTypes.number,
};

Divider.defaultProps = {
  line: false,
  height: 24,
};

export default Divider;
