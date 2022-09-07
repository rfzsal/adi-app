import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Appbar, useTheme } from 'react-native-paper';

import Divider from '../../components/Divider';

const ProfileUpdate = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const { colors } = useTheme();

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
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Daftar Anggota" />
      </Appbar.Header>

      <View style={styles.mainContainer}>
        <Divider height={16} />

        <Text>Nama</Text>
        <TextInput mode="outlined" />
        <Divider height={16} />

        <Text>Universitas</Text>
        <TextInput mode="outlined" />
        <Divider height={16} />

        <Divider height={16} />

        <Button
          onPress={() => {
            navigation.navigate('Checkout', {
              product: {
                name: 'Registrasi Anggota',
                price: 250000,
              },
            });
          }}
          mode="contained"
        >
          Daftar Anggota
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

export default ProfileUpdate;
