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

      <Image style={styles.vectorImage} source={landing} />

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
    marginBottom: 8,
  },
  subtitle: { textAlign: 'center', fontSize: 16 },
  vectorImage: {
    height: 320,
    resizeMode: 'contain',
    right: 1,
    bottom: 24,
  },
  container: { paddingHorizontal: 48 },
  loginButton: {
    bottom: 24,
  },
});

export default Landing;
