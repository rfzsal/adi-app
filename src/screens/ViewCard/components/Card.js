import propTypes from 'prop-types';
import { View, Image, StyleSheet } from 'react-native';
import { Text, Colors, Button } from 'react-native-paper';

const Card = ({ user, registered, onPress }) => {
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            borderColor: Colors.grey400,
          },
          styles.cardBackground,
        ]}
      >
        <Image
          resizeMode="contain"
          style={{ height: '100%' }}
          source={require('../../../../assets/images/adi.jpg')}
        />

        <View style={styles.photoContainer}>
          <View style={styles.photo}>
            <Image style={{ height: '100%' }} source={{ uri: user.avatar }} />
          </View>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.university}</Text>
          <Text style={styles.text}>0123456</Text>
        </View>
      </View>

      {!registered && (
        <View
          style={[
            {
              backgroundColor: Colors.red50,
            },
            styles.cardRegistration,
          ]}
        >
          <View
            style={[
              {
                borderColor: Colors.red600,
              },
              styles.innerCardContainer,
            ]}
          >
            <Text style={styles.cardRegistrationText}>
              Kamu belum terdaftar sebagai anggota
            </Text>
            <Button onPress={onPress} mode="contained">
              Daftar Anggota
            </Button>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
  cardBackground: {
    aspectRatio: 9 / 5.5,
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 1,
  },
  photoContainer: {
    position: 'absolute',
    top: 72,
    right: 24,
  },
  photo: {
    aspectRatio: 3 / 4,
    height: 96,
  },
  textContainer: { position: 'absolute', top: 80, left: 16 },
  text: { fontSize: 12 },
  cardRegistration: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    right: 16,
    top: 0,
    borderRadius: 8,
  },
  innerCardContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderStyle: 'dashed',
    height: '100%',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cardRegistrationText: { textAlign: 'center', marginBottom: 8 },
});

Card.propTypes = {
  registered: propTypes.bool,
  user: propTypes.any,
  onPress: propTypes.func,
};

export default Card;
