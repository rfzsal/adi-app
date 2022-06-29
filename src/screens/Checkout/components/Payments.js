import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, useTheme, TouchableRipple, Colors } from 'react-native-paper';

const Spacing = () => {
  return <View style={styles.spacing} />;
};

const Button = ({ children, selected, disabled, onPress }) => {
  const { colors } = useTheme();

  const borderColor = selected ? colors.primary : Colors.grey400;
  const color = selected ? colors.primary : colors.text;

  return (
    <View style={[styles.selectorButtonContainer, { borderColor }]}>
      <TouchableRipple
        disabled={disabled}
        style={styles.selectorButton}
        onPress={onPress}
      >
        <View style={styles.innerSelectorButtonContainer}>
          <Text style={[styles.selectorButtonText, { color }]}>{children}</Text>
          <View style={[styles.dotContainer, { borderColor }]}>
            {selected && (
              <View style={[styles.innerDot, { backgroundColor: color }]} />
            )}
          </View>
        </View>
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

  return <View style={styles.selectorContainer}>{variantButton}</View>;
};

const styles = StyleSheet.create({
  selectorButtonContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  selectorButton: { paddingVertical: 16, paddingHorizontal: 16 },
  innerSelectorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorButtonText: { fontWeight: 'bold' },
  dotContainer: {
    borderRadius: 100,
    height: 16,
    width: 16,
    borderWidth: 1.6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerDot: {
    borderRadius: 100,
    height: 8,
    width: 8,
  },
  spacing: { marginTop: 8 },
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
