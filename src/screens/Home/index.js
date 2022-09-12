import { StatusBar } from 'expo-status-bar';
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Text, Colors, useTheme, Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import { useUser } from '../../hooks/useUser';
import IconButton from './components/IconButton';
import NewsBox from './components/NewsBox';
import RegisterBanner from './components/RegisterBanner';

const Home = ({ navigation }) => {
  const auth = useAuth();
  const user = useUser();
  const { colors } = useTheme();

  const registered = user ? user?.ADIMember >= Date.now() : 'loading';

  return (
    <>
      <StatusBar backgroundColor={colors.primary} />
      <SafeAreaView>
        <ScrollView>
          <View
            style={{
              height: 108,
              backgroundColor: colors.primary,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Image
                style={{ height: 88, width: 88 }}
                source={require('../../../assets/images/icon.png')}
              />
            </View>
          </View>

          <View style={{ paddingHorizontal: 16 }}>
            {!auth.user && <RegisterBanner />}

            {auth.user && auth.user !== 'authenticating' && (
              <View
                style={{
                  backgroundColor: colors.background,
                  bottom: 24,
                  borderRadius: 8,
                  elevation: 2,
                  paddingVertical: 8,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Profile')}
                  style={{
                    paddingHorizontal: 16,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Avatar.Image
                    size={48}
                    source={{
                      uri:
                        auth.user.avatar ||
                        `https://avatars.dicebear.com/api/initials/${
                          auth.user.name
                        }.png?b=%23${colors.primary.split('#')[1]}`,
                    }}
                  />

                  <View style={{ marginLeft: 16, bottom: 2 }}>
                    <Text style={{ fontSize: 16 }}>
                      Halo,{' '}
                      <Text
                        style={{
                          fontWeight: 'bold',
                        }}
                      >
                        {auth.user.name}
                      </Text>{' '}
                    </Text>

                    {registered && registered !== 'loading' && (
                      <Text
                        style={{
                          backgroundColor: colors.primary,
                          color: colors.background,
                          borderRadius: 8,
                          paddingHorizontal: 8,
                          paddingVertical: 2,
                          alignSelf: 'flex-start',
                          textAlign: 'center',
                          fontSize: 12,
                          marginTop: 4,
                        }}
                      >
                        Anggota ADI
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>

                {registered && registered !== 'loading' && (
                  <>
                    <Divider height={16} />
                    <Divider line />
                    <Divider height={8} />

                    <View style={{ paddingHorizontal: 16 }}>
                      <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>
                        Masa Aktif
                      </Text>
                      <Text
                        style={{
                          paddingVertical: 8,
                          textAlign: 'center',
                          borderRadius: 8,
                          backgroundColor: Colors.green50,
                          color: Colors.green800,
                        }}
                      >
                        10 September 2022 - 10 September 2023
                      </Text>
                    </View>
                  </>
                )}
              </View>
            )}
          </View>

          <View style={styles.iconButtonContainer}>
            <IconButton
              icon={require('../../../assets/images/news.png')}
              label="Berita"
            />
            <IconButton
              icon={require('../../../assets/images/seminar.png')}
              label="Seminar"
            />
            <IconButton
              icon={require('../../../assets/images/workshop.png')}
              label="Workshop"
            />
          </View>

          <Divider height={24} />

          {!auth.user && (
            <View
              style={{ backgroundColor: colors.primary, paddingHorizontal: 16 }}
            >
              <Divider height={16} />
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MemberStatus', { registered: false })
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 72,
                      aspectRatio: 4 / 3,
                      marginRight: 16,
                    }}
                  >
                    <Image
                      style={{ height: '100%', borderRadius: 8 }}
                      source={{
                        uri: 'https://i.postimg.cc/sgSVQTRz/ADI-DISKON-50.png',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>
                      Promo! HUT 24 Tahun Asosiasi Dosen Indonesia
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Colors.grey600,
                        marginTop: 2,
                      }}
                    >
                      Hemat 50% untuk pendaftaran anggota Asosiasi Dosen
                      Indonesia{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider height={16} />
            </View>
          )}

          {!registered && registered !== 'loading' && (
            <View
              style={{ backgroundColor: colors.primary, paddingHorizontal: 16 }}
            >
              <Divider height={16} />
              <View
                style={{
                  backgroundColor: colors.background,
                  borderRadius: 8,
                  padding: 16,
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('MemberStatus', { registered: false })
                  }
                  activeOpacity={0.8}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      height: 72,
                      aspectRatio: 4 / 3,
                      marginRight: 16,
                    }}
                  >
                    <Image
                      style={{ height: '100%', borderRadius: 8 }}
                      source={{
                        uri: 'https://i.postimg.cc/sgSVQTRz/ADI-DISKON-50.png',
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>
                      Promo! HUT 24 Tahun Asosiasi Dosen Indonesia
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Colors.grey600,
                        marginTop: 2,
                      }}
                    >
                      Hemat 50% untuk pendaftaran anggota Asosiasi Dosen
                      Indonesia{' '}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              <Divider height={16} />
            </View>
          )}

          {registered && registered !== 'loading' && (
            <View style={{ backgroundColor: Colors.grey100 }}>
              <Divider height={8} />
            </View>
          )}

          <Divider height={16} />

          <View style={styles.headerContainer}>
            <Text style={styles.header}>Berita Terbaru</Text>
            <Text>Lihat Semua</Text>
          </View>

          <Divider height={16} />

          <View style={{ paddingHorizontal: 16 }}>
            <NewsBox
              text="Diskusi Rutin Asosiasi Dosen Indonesia dengan Ikatan Ilmuan Indonesia Internasional"
              image="https://adi.or.id/images/berita/45.jpg"
            />
            <Divider height={16} />
            <NewsBox
              text="Diskusi Rutin ADI dengan Indonesia Diaspora Network United"
              image="https://adi.or.id/images/berita/44.jpg"
            />
            <Divider height={16} />
            <NewsBox
              text="Call for Extended Abstracts! Konferensi Nasional Riset Manajemen - XI (17-18 Feb 2021)"
              image="https://adi.or.id/images/berita/41.jpg"
            />
            <Divider height={16} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  iconButtonContainer: {
    flex: 3,
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  headerContainer: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header: { fontSize: 18, fontWeight: 'bold' },
  newsContainer: { paddingHorizontal: 16 },
});
