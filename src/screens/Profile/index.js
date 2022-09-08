import React from 'react';
import { View, ScrollView, StyleSheet, Alert } from 'react-native';
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
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import ProfileAvatar from './components/ProfileAvatar';
import RippleMenu from './components/RippleMenu';

const VERSION = appConfig.expo.version;

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();
  const user = useUser();

  const registered = user?.ADIMember >= Date.now();

  const handleSignOut = () => {
    Alert.alert(
      'Keluar dari akun?',
      'Apakah kamu yakin ingin keluar dari akun?',
      [{ text: 'Keluar', onPress: auth.signOut }, { text: 'Tidak' }]
    );
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
                chip={registered ? 'Anggota ADI' : null}
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
              <TouchableRipple
                onPress={() => {
                  if (auth.user && auth.user !== 'authenticating') {
                    navigation.navigate('ViewCard', { user });
                  }
                }}
                style={styles.selectorButton}
              >
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
          <RippleMenu onPress={() => {}} text="Ubah Profil" />
          <Divider line />
          <RippleMenu onPress={() => {}} text="Daftar Transaksi" />

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Tentang</Text>
          <RippleMenu onPress={() => {}} text="FAQ" />
          <Divider line />
          <RippleMenu onPress={() => {}} text="Syarat dan Ketentuan" />
          <Divider line />
          <RippleMenu onPress={() => {}} text="Kebijakan Privasi" />

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
          <RippleMenu onPress={() => {}} text="Email" />

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
