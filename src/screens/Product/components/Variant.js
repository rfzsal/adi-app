import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, TouchableRipple } from 'react-native-paper';

const Spacing = () => {
  return <View style={styles.spacing} />;
};

const Button = ({ children, selected, disabled, onPress }) => {
  const { colors } = useTheme();

  const borderColor = selected ? colors.primary : colors.disabled;
  const color = selected ? colors.primary : colors.text;

  return (
    <View style={[styles.selectorButtonContainer, { borderColor }]}>
      <TouchableRipple
        disabled={disabled}
        style={styles.selectorButton}
        onPress={onPress}
      >
        <Text style={[styles.selectorButtonText, { color }]}>{children}</Text>
      </TouchableRipple>
    </View>
  );
};

const Container = ({ children }) => {
  const variantButton = children.map((child, index) => {
    if (index > 0) {
      return (
        <React.Fragment key={child.props.children}>
          <Spacing />
          {child}
        </React.Fragment>
      );
    }

    return <React.Fragment key={child.props.children}>{child}</React.Fragment>;
  });

  return (
    <>
      <Text style={styles.header}>Pilih paket</Text>

      <View style={styles.selectorContainer}>{variantButton}</View>
    </>
  );
};

const styles = StyleSheet.create({
  header: { fontWeight: 'bold' },
  selectorContainer: {
    flexDirection: 'row',
    marginTop: 8,
    alignItems: 'center',
  },
  selectorButtonContainer: { flex: 1, borderWidth: 1, borderRadius: 8 },
  selectorButton: { paddingVertical: 16 },
  selectorButtonText: { textAlign: 'center', fontWeight: 'bold' },
  spacing: { marginLeft: 8 },
});

Button.propTypes = {
  children: propTypes.string.isRequired,
  selected: propTypes.bool,
  disabled: propTypes.bool,
  onPress: propTypes.func,
};

Button.defaultProps = {
  onPress: () => {},
  disabled: false,
};

Container.propTypes = {
  children: propTypes.arrayOf(propTypes.element).isRequired,
};

export default { Container, Button };
