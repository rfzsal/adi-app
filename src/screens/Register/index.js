import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Alert,
  Keyboard,
  Image,
} from 'react-native';
import { Text, Button, TextInput, useTheme, Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';

const Login = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const { colors } = useTheme();
  const auth = useAuth();

  const handleSignIn = async () => {
    Keyboard.dismiss();

    if (!validateEmail()) return false;
    if (!validatePassword()) return false;
    if (error) return false;

    setIsLoading(true);

    const status = await auth.signInEmail(email, password);

    if (status.error) {
      Alert.alert(
        'Gagal Masuk',
        'Email atau kata sandi salah, silahkan coba lagi.'
      );

      setIsLoading(false);
    }
  };

  const validateEmail = () => {
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w\w+)+$/;

    if (!reg.test(email)) {
      setError({ email: 'Format email salah' });
      return false;
    } else {
      setError(false);
    }

    return true;
  };

  const validatePassword = () => {
    if (password.trim().length === 0) {
      setError({ password: 'Kata sandi belum diisi' });
      return false;
    } else {
      setError(false);
    }

    return true;
  };

  return (
    <>
      <StatusBar translucent />

      <ScrollView style={{ backgroundColor: Colors.blue50 }}>
        <SafeAreaView style={{ flex: 1 }}>
          <Divider height={16} />
          <View
            style={{
              height: 160,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              style={{ right: 4 }}
              source={require('../../../assets/images/myadi.png')}
            />
          </View>
          <Divider height={16} />

          <Divider height={16} />
          <View style={styles.mainContainer}>
            <Button
              icon={({ size }) => (
                <Image
                  source={require('../../../assets/images/google.png')}
                  style={{ width: size, height: size }}
                />
              )}
              disabled={isLoading}
              onPress={auth.signIn}
              mode="contained"
              labelStyle={{ color: colors.text }}
              style={{
                paddingVertical: 4,
                backgroundColor: colors.background,
                borderColor: colors.background,
              }}
            >
              Daftar Dengan Google
            </Button>
          </View>

          <Divider height={32} />
          <Divider line lineColor={Colors.grey400} />

          <View style={styles.otherMethodTextContainer}>
            <Text
              style={[
                {
                  backgroundColor: Colors.blue50,
                },
                styles.otherMethodText,
              ]}
            >
              atau
            </Text>
          </View>

          <Divider height={8} />

          <View style={styles.mainContainer}>
            <Text>Email</Text>
            <TextInput
              error={error?.email}
              value={email}
              mode="outlined"
              onChangeText={setEmail}
              onBlur={validateEmail}
            />
            {error?.email && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error.email}
              </Text>
            )}

            <Divider height={16} />

            <Text>Kata Sandi</Text>
            <TextInput
              error={error?.password}
              value={password}
              mode="outlined"
              onChangeText={setPassword}
              secureTextEntry
            />
            {error?.password && (
              <Text style={[styles.errorText, { color: colors.error }]}>
                {error.password}
              </Text>
            )}

            <Divider height={32} />
            <Button
              disabled={isLoading}
              onPress={handleSignIn}
              mode="contained"
              style={{ paddingVertical: 4 }}
            >
              Daftar
            </Button>

            <Divider height={24} />

            <Text
              style={{
                alignSelf: 'center',
                paddingHorizontal: 8,
              }}
              onPress={() => navigation.replace('Login')}
            >
              Sudah punya akun?{' '}
              <Text
                style={{
                  color: colors.primary,
                }}
              >
                Masuk sekarang
              </Text>
            </Text>
          </View>

          <Divider height={72} />

          <View>
            <Text style={{ textAlign: 'center' }}>
              Asosiasi Dosen Indonesia 1.0.0
            </Text>
            <Text
              style={{
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              All Right Reserved
            </Text>
          </View>

          <Divider height={16} />
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  appbarMenuContainer: { paddingRight: 12 },
  appBarMenu: { paddingVertical: 4 },
  mainContainer: { paddingHorizontal: 16 },
  errorText: { fontSize: 12 },
  otherMethodText: { textAlign: 'center', paddingHorizontal: 16 },
  otherMethodTextContainer: { alignItems: 'center', bottom: 12 },
});

export default Login;
