import propTypes from 'prop-types';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme, Text } from 'react-native-paper';

const Bubble = ({ children, position }) => {
  const { colors } = useTheme();

  let backgroundColor;
  switch (position) {
    case 'left':
      backgroundColor = colors.bubbleIn;
      break;
    case 'right':
      backgroundColor = colors.bubbleOut;
      break;
    case 'center':
      backgroundColor = colors.bubbleIn;
      break;
  }

  const flexDirection = position === 'left' ? 'row' : 'row-reverse';

  return position === 'center' ? (
    <View style={styles.systemContainer}>
      <View style={[{ backgroundColor }, styles.systemBubble]}>
        <Text style={[{ color: colors.lightText }, styles.systemText]}>
          {children}
        </Text>
      </View>
    </View>
  ) : (
    <View style={[{ flexDirection }, styles.userContainer]}>
      <View style={[{ backgroundColor }, styles.userBubble]}>
        <Text>{children}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  systemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  systemBubble: { padding: 8, borderRadius: 8 },
  systemText: { fontSize: 12 },
  userContainer: { flex: 1, marginTop: 8 },
  userBubble: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    maxWidth: '90%',
  },
});

Bubble.propTypes = {
  children: propTypes.string.isRequired,
  position: propTypes.oneOf(['left', 'right', 'center']),
};

export default Bubble;
