import PropTypes from 'prop-types';
import { View, StyleSheet, Image } from 'react-native';
import { Text, Colors } from 'react-native-paper';

const Benefit = ({ title, subtitle, image }) => {
  return (
    <View style={styles.containerRow}>
      <View style={styles.iconContainer}>
        <Image style={styles.icon} source={image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={[styles.subtitle, { color: Colors.grey600 }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerRow: { flexDirection: 'row', paddingHorizontal: 16 },
  iconContainer: {
    height: 64,
    width: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { resizeMode: 'contain', height: 48, width: 48 },
  textContainer: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { maxWidth: 280 },
});

export default Benefit;

Benefit.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
};
