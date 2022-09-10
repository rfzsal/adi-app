import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TouchableRipple, Text, useTheme } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RippleMenu = ({ text, onPress, icon }) => {
  const { colors } = useTheme();

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.menuContainer}>
        <MaterialCommunityIcons
          style={styles.icon}
          color={colors.primary}
          name={icon}
          size={24}
        />

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
  icon: { position: 'absolute', left: 16 },
  menuText: { fontSize: 16, paddingLeft: 32 },
  menuIcon: { top: 1 },
});

RippleMenu.propTypes = {
  text: propTypes.string.isRequired,
  icon: propTypes.string.isRequired,
  onPress: propTypes.func,
};

RippleMenu.defaultProps = {
  onPress: () => {},
};

export default RippleMenu;
