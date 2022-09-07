import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
  Image,
} from 'react-native';
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
  const isRegistered = route.params?.registered;

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
              <Divider height={16} />
            </>
          )}

          {auth.user && auth.user !== 'authenticating' && (
            <>
              <ProfileAvatar
                name={auth.user.name || auth.user.email}
                avatar={auth.user.avatar}
              />
              <Divider height={16} />
            </>
          )}

          {auth.user && auth.user !== 'authenticating' && (
            <>
              <View style={{ paddingHorizontal: 16 }}>
                <View
                  style={{
                    aspectRatio: 9 / 5.5,
                    borderRadius: 8,
                    overflow: 'hidden',
                    alignItems: 'center',
                    borderColor: Colors.grey400,
                    borderWidth: 1,
                  }}
                >
                  <Image
                    resizeMode="contain"
                    style={{ height: '100%' }}
                    source={require('../../../assets/images/adi.jpg')}
                  />

                  <View
                    style={{
                      backgroundColor: 'pink',
                      position: 'absolute',
                      top: 72,
                      right: 24,
                    }}
                  >
                    <View
                      style={{
                        aspectRatio: 3 / 4,
                        height: 96,
                        backgroundColor: Colors.red50,
                      }}
                    >
                      <Image
                        style={{ height: '100%' }}
                        source={{ uri: auth.user.avatar }}
                      />
                    </View>
                  </View>

                  <View style={{ position: 'absolute', top: 80, left: 16 }}>
                    <Text style={{ fontSize: 12 }}>Muhammad Faizal Fazri</Text>
                    <Text style={{ fontSize: 12 }}>Universitas Raharja</Text>
                    <Text style={{ fontSize: 12 }}>0812345</Text>
                  </View>
                </View>

                {!isRegistered && (
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 16,
                      right: 16,
                      top: 0,
                      borderRadius: 8,
                      backgroundColor: Colors.red50,
                    }}
                  >
                    <View
                      style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        height: '100%',
                        borderColor: Colors.red600,
                        justifyContent: 'center',
                        paddingHorizontal: 16,
                      }}
                    >
                      <Text style={{ textAlign: 'center', marginBottom: 8 }}>
                        Kamu belum terdaftar sebagai anggota
                      </Text>
                      <Button
                        onPress={() => {
                          navigation.navigate('ProfileUpdate');
                        }}
                        mode="contained"
                      >
                        Daftar Anggota
                      </Button>
                    </View>
                  </View>
                )}
              </View>
              <Divider height={36} />
            </>
          )}

          <Text style={styles.menuHeadingText}>Akun</Text>
          <RippleMenu
            onPress={() => navigation.navigate('FAQ')}
            text="Ubah Profil"
          />
          <Divider line />

          <Divider height={36} />

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
          <Divider line />

          <Divider height={36} />

          <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
          <RippleMenu onPress={() => handleOpenContact('email')} text="Email" />
          <Divider line />

          {auth.user && auth.user !== 'authenticating' && (
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
