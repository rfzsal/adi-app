import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RippleMenu = ({ text, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.menuContainer}>
        <Text style={styles.menuText}>{text}</Text>

        <MaterialCommunityIcons
          style={styles.menuIcon}
          color={colors.disabled}
          name="chevron-right"
          size={24}
        />
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  menuText: { fontSize: 16 },
  menuIcon: { top: 1 },
});

RippleMenu.propTypes = {
  text: propTypes.string.isRequired,
  onPress: propTypes.func,
};

RippleMenu.defaultProps = {
  onPress: () => {},
};

export default RippleMenu;
