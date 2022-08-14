import { View, StyleSheet, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import landing from '../../../assets/images/landing.png';
import { useAuth } from '../../hooks/useAuth';

const Landing = () => {
  const auth = useAuth();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Text style={styles.title}>BigBoyz</Text>
      <Text style={styles.subtitle}>Konsultasi masalah IT dengan mudah</Text>

      <View
        style={{
          flex: 1,
          height: 320,
          maxHeight: 320,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Image style={styles.vectorImage} source={landing} />
      </View>

      <View style={styles.container}>
        <Button
          onPress={auth.signIn}
          style={styles.loginButton}
          mode="contained"
          loading={auth.user === 'authenticating'}
          icon="google"
        >
          Lanjutkan Dengan Google
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, paddingTop: 72 },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 32,
    letterSpacing: 1,
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  subtitle: { textAlign: 'center', fontSize: 16, paddingHorizontal: 16 },
  vectorImage: {
    height: 320,
    resizeMode: 'contain',
    bottom: 24,
  },
  container: { paddingHorizontal: 16 },
  loginButton: {
    position: 'absolute',
    right: 16,
    left: 16,
    bottom: 8,
  },
});

export default Landing;
