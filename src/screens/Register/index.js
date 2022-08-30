import { useState } from 'react';
import { View, StyleSheet, Alert, Keyboard } from 'react-native';
import { Text, Button, TextInput, Appbar, useTheme } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';

const Register = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const { colors } = useTheme();
  const auth = useAuth();

  const handleSignUp = async () => {
    Keyboard.dismiss();

    if (!validateEmail()) return false;
    if (!validatePassword()) return false;
    if (!validateConfirmPassword()) return false;
    if (error) return false;

    setIsLoading(true);

    const status = await auth.signUpEmail(email, password);

    if (
      status.error?.message ===
      '[auth/email-already-in-use] The email address is already in use by another account.'
    ) {
      Alert.alert(
        'Gagal Registrasi',
        'Email tersebut telah digunakan, silahkan gunakan email yang lain.'
      );

      setIsLoading(false);
      return;
    }

    Alert.alert(
      'Aktivasi Email',
      'Link aktivasi email telah dikirim, silahkan cek inbox email anda.'
    );

    navigation.replace('Login');
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
    if (password.trim().length < 8) {
      setError({ password: 'Kata sandi minimal 8 karakter' });
      return false;
    } else {
      setError(false);
    }

    return true;
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setError({ confirmPassword: 'Kata sandi tidak sesuai' });
      return false;
    } else {
      setError(false);
    }

    return true;
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.Content title="Daftar" />

        <View style={styles.appbarMenuContainer}>
          <Text
            onPress={() => navigation.replace('Login')}
            style={styles.appBarMenu}
          >
            Masuk
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
          onBlur={validatePassword}
          secureTextEntry
        />
        {error?.password && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error.password}
          </Text>
        )}

        <Divider height={16} />

        <Text>Konfirmasi Kata Sandi</Text>
        <TextInput
          error={error?.confirmPassword}
          value={confirmPassword}
          mode="outlined"
          onChangeText={setconfirmPassword}
          onBlur={validateConfirmPassword}
          secureTextEntry
        />
        {error?.confirmPassword && (
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error.confirmPassword}
          </Text>
        )}
        <Divider height={16} />

        <Button disabled={isLoading} onPress={handleSignUp} mode="contained">
          Daftar
        </Button>
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
          atau daftar dengan
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

export default Register;
