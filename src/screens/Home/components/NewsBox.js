import propTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Colors, TouchableRipple } from 'react-native-paper';

const NewsBox = ({ image, text }) => {
  return (
    <View style={styles.container}>
      <TouchableRipple style={styles.touchable} onPress={() => {}}>
        <View>
          <View
            style={[
              {
                backgroundColor: Colors.grey100,
              },
              styles.contentContainer,
            ]}
          >
            <Image style={styles.image} source={{ uri: image }} />
          </View>

          <Text style={styles.text}>{text}</Text>
        </View>
      </TouchableRipple>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { borderRadius: 8, overflow: 'hidden' },
  touchable: { paddingBottom: 16 },
  contentContainer: {
    borderRadius: 8,
    aspectRatio: 16 / 9,
    width: '100%',
  },
  image: { height: '100%' },
  text: { marginTop: 8, paddingHorizontal: 8 },
});

NewsBox.propTypes = {
  image: propTypes.string.isRequired,
  text: propTypes.string.isRequired,
};

export default NewsBox;
