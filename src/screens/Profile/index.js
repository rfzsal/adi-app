import React from 'react';
import { View, ScrollView, StyleSheet, Alert, Linking } from 'react-native';
import {
  TouchableRipple,
  Button,
  Text,
  useTheme,
  Colors,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import appConfig from '../../../app.config';
import Divider from '../../components/Divider';
import contacts from '../../configs/contacts';
import { useAuth } from '../../hooks/useAuth';
import ProfileAvatar from './components/ProfileAvatar';
import RippleMenu from './components/RippleMenu';

const VERSION = appConfig.expo.version;

const Profile = ({ route, navigation }) => {
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
          {(!auth.user || auth.user === 'authenticating') && (
            <>
              <View style={styles.loginButtonContainer}>
                <Button mode="contained" onPress={auth.signIn}>
                  Masuk
                </Button>
              </View>
              <Divider height={24} />
            </>
          )}

          {auth.user && auth.user !== 'authenticating' && (
            <>
              <ProfileAvatar
                name={auth.user.name || auth.user.email}
                chip="Anggota ADI"
                avatar={auth.user.avatar}
              />

              <Divider height={16} />
              <View style={{ backgroundColor: Colors.grey100 }}>
                <Divider height={8} />
              </View>
              <Divider height={16} />
            </>
          )}

          <Text style={styles.menuHeadingText}>Anggota ADI</Text>
          <View
            style={{
              flex: 2,
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginTop: 8,
            }}
          >
            <View
              style={[
                styles.selectorButtonContainer,
                { borderColor: Colors.grey400 },
              ]}
            >
              <TouchableRipple onPress={() => {}} style={styles.selectorButton}>
                <Text style={styles.selectorButtonText}>Kartu ADI</Text>
              </TouchableRipple>
            </View>
            <View style={{ width: 16 }} />
            <View
              style={[
                styles.selectorButtonContainer,
                { borderColor: Colors.grey400 },
              ]}
            >
              <TouchableRipple onPress={() => {}} style={styles.selectorButton}>
                <Text style={styles.selectorButtonText}>Kode QR</Text>
              </TouchableRipple>
            </View>
          </View>

          <Divider height={24} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Akun</Text>
          <RippleMenu
            onPress={() => navigation.navigate('FAQ')}
            text="Ubah Profil"
          />
          <Divider line />
          <RippleMenu
            onPress={() => navigation.navigate('FAQ')}
            text="Daftar Transaksi"
          />

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Tentang</Text>
          <RippleMenu onPress={() => navigation.navigate('FAQ')} text="FAQ" />
          <Divider line />
          <RippleMenu
            onPress={() => navigation.navigate('TermsConditions')}
            text="Syarat dan Ketentuan"
          />
          <Divider line />
          <RippleMenu
            onPress={() => navigation.navigate('PrivacyPolicy')}
            text="Kebijakan Privasi"
          />

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
          <RippleMenu onPress={() => handleOpenContact('email')} text="Email" />

          {auth.user && auth.user !== 'authenticating' && (
            <>
              <Divider height={24} />
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
              <Divider height={24} />
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
  selectorButtonContainer: { flex: 1, borderWidth: 1, borderRadius: 8 },
  selectorButton: { paddingVertical: 16 },
  selectorButtonText: { textAlign: 'center', fontWeight: 'bold' },
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
