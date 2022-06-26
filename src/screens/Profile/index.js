import { ScrollView, StyleSheet, Alert } from 'react-native';
import { Text, TouchableRipple, Appbar, useTheme } from 'react-native-paper';

import { useAuth } from '../../hooks/useAuth';

const Profile = ({ route }) => {
  const auth = useAuth();
  const { colors } = useTheme();

  const handleSignOut = async () => {
    Alert.alert('Keluar dari akun?', 'Apakah kamu yakin ingin keluar?', [
      { text: 'Tidak' },
      {
        text: 'Keluar',
        onPress: auth.signOut,
      },
    ]);
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={route.name} />
      </Appbar.Header>

      <ScrollView style={styles.mainContainer}>
        <Text style={styles.centeredText}>{route.name}</Text>
        <TouchableRipple
          onPress={handleSignOut}
          style={styles.logoutButton}
          mode="flat"
        >
          <Text style={[styles.logoutButtonText, { color: colors.error }]}>
            KELUAR
          </Text>
        </TouchableRipple>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { padding: 16 },
  centeredText: { textAlign: 'center' },
  logoutButton: { marginTop: 8, paddingVertical: 8 },
  logoutButtonText: {
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    letterSpacing: 1,
  },
});

export default Profile;
