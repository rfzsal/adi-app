import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Text, useTheme } from 'react-native-paper';

const ProfileAvatar = ({ name, avatar, chip, onPress }) => {
  const { colors } = useTheme();

  const dummyAvatar = `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
    colors.primary.split('#')[1]
  }`;

  return (
    <View onTouchEnd={onPress} style={styles.mainContainer}>
      <Avatar.Image size={56} source={{ uri: avatar || dummyAvatar }} />

      <View style={styles.textContainer}>
        <Text style={styles.nameText}>{name}</Text>
        {chip && (
          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={[
                styles.chip,
                {
                  backgroundColor: colors.primary,
                  color: colors.background,
                },
              ]}
            >
              {chip}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  textContainer: { marginLeft: 16, bottom: 2 },
  nameText: { fontWeight: 'bold', fontSize: 20, letterSpacing: 0.4 },
  chipContainer: {
    flexDirection: 'row',
  },
  chip: {
    marginTop: 2,
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 12,
    borderRadius: 8,
  },
  updateProfileContainer: { flexDirection: 'row', alignItems: 'center' },
  updateProfileText: { marginRight: 4 },
  updateProfileIcon: { top: 1 },
});

ProfileAvatar.propTypes = {
  name: propTypes.string.isRequired,
  chip: propTypes.string,
  avatar: propTypes.string,
  onPress: propTypes.func,
};

ProfileAvatar.defaultProps = {
  onPress: () => {},
};

export default ProfileAvatar;
