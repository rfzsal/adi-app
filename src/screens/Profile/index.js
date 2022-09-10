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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import appConfig from '../../../app.config';
import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import BenefitBanner from './components/BenefitBanner';
import ProfileAvatar from './components/ProfileAvatar';
import RippleMenu from './components/RippleMenu';

const VERSION = appConfig.expo.version;

const Profile = ({ navigation }) => {
  const { colors } = useTheme();
  const auth = useAuth();
  const user = useUser();

  const registered = user ? user?.ADIMember >= Date.now() : 'loading';

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
                <Button
                  style={{ flex: 1 }}
                  mode="contained"
                  onPress={() => navigation.navigate('Login')}
                >
                  Masuk
                </Button>
                <View style={{ width: 16 }} />
                <Button
                  style={{ flex: 1 }}
                  mode="contained"
                  onPress={() => navigation.navigate('Register')}
                >
                  Daftar
                </Button>
              </View>
              <Divider height={16} />
            </>
          )}

          {auth.user && auth.user !== 'authenticating' && (
            <>
              <ProfileAvatar
                name={auth.user.name || auth.user.email}
                chip={
                  registered && registered !== 'loading' ? 'Anggota ADI' : null
                }
                avatar={auth.user.avatar}
              />

              <Divider height={16} />
              <Divider line />

              <RippleMenu
                icon="account-outline"
                onPress={() =>
                  navigation.navigate('MemberStatus', { registered })
                }
                text="Status Anggota"
              />

              {!registered && registered !== 'loading' && (
                <>
                  <Divider height={16} />
                  <View style={{ backgroundColor: Colors.grey100 }}>
                    <Divider height={8} />
                  </View>
                  <Divider height={16} />

                  <BenefitBanner
                    onPress={() =>
                      navigation.navigate('MemberStatus', {
                        registered: false,
                      })
                    }
                  />
                </>
              )}

              <Divider height={16} />
              <View style={{ backgroundColor: Colors.grey100 }}>
                <Divider height={8} />
              </View>
              <Divider height={16} />

              {registered && registered !== 'loading' && (
                <>
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
                        <View style={styles.selectorContainer}>
                          <MaterialCommunityIcons
                            style={styles.selectorIcon}
                            color={Colors.grey800}
                            name="card-account-details-outline"
                            size={24}
                          />
                          <Text style={styles.selectorButtonText}>
                            Kartu ADI
                          </Text>
                        </View>
                      </TouchableRipple>
                    </View>
                    <View style={{ width: 16 }} />
                    <View
                      style={[
                        styles.selectorButtonContainer,
                        { borderColor: Colors.grey400 },
                      ]}
                    >
                      <TouchableRipple
                        onPress={() => {}}
                        style={styles.selectorButton}
                      >
                        <View style={styles.selectorContainer}>
                          <MaterialCommunityIcons
                            style={styles.selectorIcon}
                            color={Colors.grey800}
                            name="qrcode"
                            size={24}
                          />
                          <Text style={styles.selectorButtonText}>Kode QR</Text>
                        </View>
                      </TouchableRipple>
                    </View>
                  </View>

                  <Divider height={24} />
                  <View style={{ backgroundColor: Colors.grey100 }}>
                    <Divider height={8} />
                  </View>
                  <Divider height={16} />
                </>
              )}

              <Text style={styles.menuHeadingText}>Akun</Text>
              <RippleMenu
                icon="account-edit-outline"
                onPress={() => {}}
                text="Ubah Profil"
              />
              <Divider line />
              <RippleMenu
                icon="wallet-outline"
                onPress={() => {}}
                text="Daftar Transaksi"
              />
              <Divider height={16} />
            </>
          )}

          {(!auth.user || auth.user === 'authenticating') && (
            <>
              <View style={{ backgroundColor: Colors.grey100 }}>
                <Divider height={8} />
              </View>
              <Divider height={16} />

              <BenefitBanner
                onPress={() =>
                  navigation.navigate('MemberStatus', {
                    registered: false,
                  })
                }
              />
            </>
          )}

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Tentang</Text>
          <RippleMenu
            icon="help-circle-outline"
            onPress={() => {}}
            text="FAQ"
          />
          <Divider line />
          <RippleMenu
            icon="file-document-outline"
            onPress={() => {}}
            text="Syarat dan Ketentuan"
          />
          <Divider line />
          <RippleMenu
            icon="shield-lock-outline"
            onPress={() => {}}
            text="Kebijakan Privasi"
          />

          <Divider height={16} />
          <View style={{ backgroundColor: Colors.grey100 }}>
            <Divider height={8} />
          </View>
          <Divider height={16} />

          <Text style={styles.menuHeadingText}>Hubungi Kami</Text>
          <RippleMenu icon="email-outline" onPress={() => {}} text="Email" />

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
  statusDetailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  statusText: { fontWeight: 'bold' },
  statusDetailText: {
    fontSize: 12,
  },
  selectorButtonContainer: { flex: 1, borderWidth: 1, borderRadius: 8 },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorIcon: { marginRight: 8, top: 1 },
  selectorButton: { paddingVertical: 16 },
  selectorButtonText: { textAlign: 'center', fontWeight: 'bold' },
  loginButtonContainer: {
    paddingHorizontal: 16,
    flex: 1,
    flexDirection: 'row',
  },
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
