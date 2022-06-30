import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const SectionHeader = ({ title, onPress }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.headerContainer}>
      <Text style={[styles.title, { color: colors.primary }]}>{title}</Text>

      <Text
        onPress={onPress}
        style={[styles.link, { color: colors.primaryLight }]}
      >
        Lihat Semua
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: { fontWeight: 'bold', fontSize: 18, letterSpacing: 0.4 },
  link: { paddingVertical: 2 },
});

SectionHeader.propTypes = {
  title: propTypes.string.isRequired,
  onPress: propTypes.func,
};

SectionHeader.defaultProps = {
  onPress: () => {},
};

export default SectionHeader;
