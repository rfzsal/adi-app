import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Linking } from 'react-native';
import { TouchableRipple, Button, Text, useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import appConfig from '../../../app.config';
import Divider from '../../components/Divider';
import contacts from '../../configs/contacts';
import { useAuth } from '../../hooks/useAuth';
import ProfileAvatar from './components/ProfileAvatar';
import RippleMenu from './components/RippleMenu';

const VERSION = appConfig.expo.version;

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

  const handleOpenContact = async (contact) => {
    let app;
    switch (contact) {
      case 'whatsapp':
        app = 'WhatsApp';
        break;
      case 'instagram':
        app = 'Instagram';
        break;
      case 'email':
        app = 'Email';
        break;
    }

    try {
      await Linking.openURL(contacts(contact));
    } catch (error) {
      Alert.alert(
        `Gagal membuka ${app}`,
        `Pastikan aplikasi ${app} sudah terinstal pada perangkat kamu`
      );
      return { error };
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainContainer}>
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
          <RippleMenu onPress={() => navigation.navigate('FAQ')} text="FAQ" />
          <Divider line />
          <RippleMenu onPress={() => navigation.navigate('Blog')} text="Blog" />
          <Divider line />
          <RippleMenu
            onPress={() => navigation.navigate('About')}
            text="Tentang BigBoyz"
          />
          <Divider line />

          <Divider height={36} />

          <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
          <RippleMenu
            onPress={() => handleOpenContact('whatsapp')}
            text="Whatsapp"
          />
          <Divider line />
          <RippleMenu
            onPress={() => handleOpenContact('instagram')}
            text="Instagram"
          />
          <RippleMenu onPress={() => handleOpenContact('email')} text="Email" />
          <Divider line />

          {auth.user && (
            <>
              <Divider height={48} />
              <View style={styles.container}>
                <View style={styles.logoutButtonContainer}>
                  <TouchableRipple onPress={handleSignOut}>
                    <View style={styles.logoutButton}>
                      <Text
                        style={[
                          styles.logoutButtonText,
                          { color: colors.error },
                        ]}
                      >
                        KELUAR
                      </Text>
                    </View>
                  </TouchableRipple>
                </View>
              </View>

              <Divider height={8} />
              <Text style={{ textAlign: 'center' }}>v{VERSION}</Text>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: { paddingVertical: 16 },
  menuHeadingText: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingHorizontal: 16,
    marginBottom: 8,
    letterSpacing: 0.4,
  },
  loginButtonContainer: { paddingHorizontal: 16 },
  container: {
    paddingHorizontal: 16,
  },
  logoutButtonContainer: {
    borderRadius: 4,
    overflow: 'hidden',
  },
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
