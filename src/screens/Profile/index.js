import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
import { TouchableRipple, Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import ProfileAvatar from './components/ProfileAvatar';
import RippleMenu from './components/RippleMenu';

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();

  const handleSignOut = () => {
    Alert.alert(
      'Keluar dari akun?',
      'Apakah kamu yakin ingin keluar dari akun?',
      [{ text: 'Keluar', onPress: auth.signOut }, { text: 'Tidak' }]
    );
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.mainContainer}>
        {auth.user && (
          <>
            <ProfileAvatar
              name={auth.user.name}
              avatar={auth.user.avatar}
              onPress={() => navigation.navigate('Dummy')}
            />
            <Divider height={36} />
          </>
        )}

        {!auth.user && (
          <>
            <View style={styles.loginButtonContainer}>
              <Button onPress={auth.login} mode="contained">
                Masuk
              </Button>
            </View>
            <Divider height={24} />
          </>
        )}

        <Text style={styles.menuHeadingText}>Bantuan</Text>
        <RippleMenu text="FAQ" />
        <Divider line />
        <RippleMenu text="Blog" />
        <Divider line />
        <RippleMenu text="Tentang BigBoyz" />
        <Divider line />

        <Divider height={36} />

        <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
        <RippleMenu text="Whatsapp" />
        <Divider line />
        <RippleMenu text="Instagram" />
        <Divider line />

        {auth.user && (
          <>
            <Divider height={48} />
            <View style={styles.logoutButtonContainer}>
              <TouchableRipple onPress={handleSignOut}>
                <View style={styles.logoutButton}>
                  <Text
                    style={[styles.logoutButtonText, { color: colors.error }]}
                  >
                    KELUAR
                  </Text>
                </View>
              </TouchableRipple>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingTop: 16 },
  menuHeadingText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  loginButtonContainer: { paddingHorizontal: 16 },
  logoutButtonContainer: { paddingHorizontal: 16 },
  logoutButton: {
    height: 36,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'sans-serif-medium',
    letterSpacing: 1,
  },
});

export default Profile;
