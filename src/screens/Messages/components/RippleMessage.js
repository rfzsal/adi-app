import { format, isToday, isYesterday } from 'date-fns';
import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, TouchableRipple, Avatar, Text } from 'react-native-paper';

const RippleMessage = ({
  title,
  subtitle,
  avatar,
  text,
  timestamp,
  counter,
  onPress,
}) => {
  const { colors } = useTheme();

  const dummyAvatar = `https://avatars.dicebear.com/api/initials/${title}.png?b=%23${
    colors.primary.split('#')[1]
  }`;

  const position = subtitle ? 4.8 : 1.6;

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.mainContainer}>
        <Avatar.Image size={48} source={{ uri: avatar || dummyAvatar }} />

        <View style={[styles.messageContainer, { bottom: position }]}>
          <View style={styles.messageTitleContainer}>
            <Text style={styles.messageTitleText}>{title}</Text>

            <Text style={styles.messageDateText}>
              {isToday(timestamp) && format(timestamp, 'HH:mm')}

              {isYesterday(timestamp) && 'Kemarin'}

              {!isToday(timestamp) &&
                !isYesterday(timestamp) &&
                format(timestamp, 'd/M/yy')}
            </Text>
          </View>

          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

          <View style={styles.messageTextContainer}>
            <Text numberOfLines={1} style={styles.messageText}>
              {text}
            </Text>

            {counter > 0 && (
              <Avatar.Text
                style={{ backgroundColor: colors.notification }}
                color="white"
                size={18}
                label={counter}
              />
            )}
          </View>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
  },
  subtitle: { marginLeft: 16 },
  messageContainer: { flex: 1 },
  messageTitleContainer: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageTitleText: { fontWeight: 'bold', fontSize: 16, letterSpacing: 0.4 },
  messageDateText: { fontSize: 12 },
  messageTextContainer: {
    marginLeft: 16,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageText: { flex: 1 },
});

RippleMessage.propTypes = {
  title: propTypes.string.isRequired,
  subtitle: propTypes.string,
  avatar: propTypes.string,
  text: propTypes.string,
  timestamp: propTypes.number.isRequired,
  counter: propTypes.number,
  onPress: propTypes.func,
};

RippleMessage.defaultProps = {
  onPress: () => {},
};

export default RippleMessage;
