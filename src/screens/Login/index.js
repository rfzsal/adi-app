import { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Text, Button, TextInput, Appbar, useTheme } from 'react-native-paper';

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
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content title="Masuk" />

        <View style={styles.appbarMenuContainer}>
          <Text
            onPress={() => navigation.replace('Register')}
            style={styles.appBarMenu}
          >
            Daftar
          </Text>
        </View>
      </Appbar.Header>

      <View style={styles.mainContainer}>
        <Divider height={16} />

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

        <Divider height={16} />

        <Button disabled={isLoading} onPress={handleSignIn} mode="contained">
          Masuk
        </Button>

        {/* <Divider height={16} />

        <View>
          <Text
            style={{
              position: 'absolute',
              padding: 0,
              paddingHorizontal: 8,
              right: -8,
              color: colors.primary,
            }}
          >
            Lupa kata sandi?
          </Text>
        </View> */}
      </View>

      <Divider height={32} />
      <Divider line />
      <View style={styles.otherMethodTextContainer}>
        <Text
          style={[
            {
              color: colors.placeholderText,
              backgroundColor: colors.background,
            },
            styles.otherMethodText,
          ]}
        >
          atau masuk dengan
        </Text>
      </View>

      <Divider height={12} />

      <View style={styles.mainContainer}>
        <Button disabled={isLoading} onPress={auth.signIn} mode="outlined">
          Google
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appbarMenuContainer: { paddingRight: 12 },
  appBarMenu: { paddingVertical: 4 },
  mainContainer: { paddingHorizontal: 16 },
  errorText: { fontSize: 12 },
  otherMethodText: { textAlign: 'center', paddingHorizontal: 8 },
  otherMethodTextContainer: { alignItems: 'center', bottom: 12 },
});

export default Login;
