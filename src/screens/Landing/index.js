import { ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../hooks/useAuth';

const Landing = ({ route }) => {
  const auth = useAuth();

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        <Text style={styles.centeredText}>{route.name}</Text>
        <Button
          onPress={auth.signIn}
          style={styles.loginButton}
          mode="contained"
        >
          Lanjutkan Dengan Google
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: 16 },
  centeredText: { textAlign: 'center' },
  loginButton: { marginTop: 8 },
});

export default Landing;