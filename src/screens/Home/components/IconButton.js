import propTypes from 'prop-types';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Colors } from 'react-native-paper';

const IconButton = ({ icon, label }) => {
  return (
    <View style={styles.conatiner}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          {
            borderColor: Colors.grey400,
          },
          styles.touchable,
        ]}
      >
        <Image style={styles.icon} source={icon} />
      </TouchableOpacity>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  touchable: {
    height: 80,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  icon: { height: 56, width: 56 },
  label: { textAlign: 'center', marginTop: 8 },
});

IconButton.propTypes = {
  icon: propTypes.any.isRequired,
  label: propTypes.string.isRequired,
};

export default IconButton;
