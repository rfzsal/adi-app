import { format } from 'date-fns';
import propTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TouchableRipple, Avatar, useTheme } from 'react-native-paper';

const RippleOrder = ({ name, client, duration, image, timestamp, onPress }) => {
  const { colors } = useTheme();

  const dummyImage = `https://avatars.dicebear.com/api/initials/${name}.png?b=%23${
    colors.primary.split('#')[1]
  }`;

  return (
    <TouchableRipple onPress={onPress} style={styles.mainContainer}>
      <View style={styles.container}>
        <Avatar.Image source={{ uri: image || dummyImage }} size={32} />

        <View style={styles.detailsContainer}>
          <View style={styles.transactionContainer}>
            <Text style={styles.transaction}>{name}</Text>
            <Text style={styles.price}>{duration} Jam</Text>
          </View>

          <Text style={[styles.date, { color: colors.textLight }]}>
            {client}
          </Text>
          <Text>{format(timestamp, 'dd MMMM yyyy, HH:mm')}</Text>
        </View>
      </View>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingVertical: 16 },
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  detailsContainer: { flex: 1, marginLeft: 16, bottom: 4 },
  transactionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  transaction: { fontSize: 16, fontWeight: 'bold', letterSpacing: 0.4 },
  price: { letterSpacing: 0.4, fontWeight: 'bold' },
  date: { marginBottom: 16 },
});

RippleOrder.propTypes = {
  name: propTypes.string.isRequired,
  client: propTypes.string.isRequired,
  duration: propTypes.number,
  image: propTypes.string,
  timestamp: propTypes.number.isRequired,
  onPress: propTypes.func,
};

RippleOrder.defaultProps = {
  onPress: () => {},
};

export default RippleOrder;
