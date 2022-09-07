import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import {
  Avatar,
  Text,
  Colors,
  TouchableRipple,
  Button,
} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import PromosCarousel from './components/PromosCarousel';

const Home = ({ route, navigation }) => {
  const auth = useAuth();
  const isRegistered = route.params?.registered;

  return (
    <SafeAreaView>
      <ScrollView>
        <PromosCarousel
          promos={[
            'https://adi.or.id/img/gallery/8.jpg',
            'https://adi.or.id/img/gallery/3.jpg',
            'https://adi.or.id/img/gallery/1.jpg',
          ]}
        />

        {/* {(!auth.user || auth.user === 'authenticating') && (
          <View style={{ paddingHorizontal: 16, paddingTop: 16 }}>
            <View
              style={{
                borderWidth: 1,
                padding: 16,
                borderStyle: 'dashed',
                borderRadius: 8,
                borderColor: Colors.amber600,
                backgroundColor: Colors.amber50,
              }}
            >
              <Text style={{ marginBottom: 8, textAlign: 'center' }}>
                Masuk untuk melihat kartu anggota
              </Text>
              <Button onPress={auth.signIn} mode="contained">
                Masuk
              </Button>
            </View>
          </View>
        )} */}

        {/* {auth.user && auth.user !== 'authenticating' && (
          <View style={{ paddingHorizontal: 16 }}>
            <View
              style={{
                aspectRatio: 9 / 5.5,
                borderRadius: 8,
                overflow: 'hidden',
                alignItems: 'center',
              }}
            >
              <Image
                resizeMode="center"
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
        )} */}

        <Divider height={24} />

        <View
          style={{
            flex: 3,
            flexDirection: 'row',
            paddingHorizontal: 16,
          }}
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                height: 80,
                aspectRatio: 1 / 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.grey400,
              }}
            >
              <Image
                style={{ height: 56, width: 56 }}
                source={require('../../../assets/images/news.png')}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: 8 }}>Berita</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                height: 80,
                aspectRatio: 1 / 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.grey400,
              }}
            >
              <Image
                style={{ height: 64, width: 64 }}
                source={require('../../../assets/images/seminar.png')}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: 8 }}>Seminar</Text>
          </View>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 16,
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={{
                height: 80,
                aspectRatio: 1 / 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1,
                borderRadius: 8,
                borderColor: Colors.grey400,
              }}
            >
              <Image
                style={{ height: 56, width: 56, bottom: 2 }}
                source={require('../../../assets/images/workshop.png')}
              />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', marginTop: 8 }}>Workshop</Text>
          </View>
        </View>

        <Divider height={24} />
        <View style={{ backgroundColor: Colors.grey100 }}>
          <Divider height={8} />
        </View>
        <Divider height={16} />

        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Berita Terbaru
          </Text>
          <Text>Lihat Semua</Text>
        </View>

        <Divider height={24} />

        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <TouchableRipple style={{ paddingBottom: 16 }} onPress={() => {}}>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.grey100,
                    borderRadius: 8,
                    aspectRatio: 16 / 9,
                    width: '100%',
                  }}
                >
                  <Image
                    style={{ height: '100%' }}
                    source={{ uri: 'https://adi.or.id/images/berita/45.jpg' }}
                  />
                </View>
                <Text style={{ marginTop: 8, paddingHorizontal: 8 }}>
                  Diskusi Rutin Asosiasi Dosen Indonesia dengan Ikatan Ilmuan
                  Indonesia Internasional
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
        <Divider height={16} />

        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <TouchableRipple style={{ paddingBottom: 16 }} onPress={() => {}}>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.grey100,
                    borderRadius: 8,
                    aspectRatio: 16 / 9,
                    width: '100%',
                  }}
                >
                  <Image
                    style={{ height: '100%' }}
                    source={{ uri: 'https://adi.or.id/images/berita/44.jpg' }}
                  />
                </View>
                <Text style={{ marginTop: 8, paddingHorizontal: 8 }}>
                  Diskusi Rutin ADI dengan Indonesia Diaspora Network United
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
        <Divider height={16} />
        <View style={{ paddingHorizontal: 16 }}>
          <View style={{ borderRadius: 8, overflow: 'hidden' }}>
            <TouchableRipple style={{ paddingBottom: 16 }} onPress={() => {}}>
              <View>
                <View
                  style={{
                    backgroundColor: Colors.grey100,
                    borderRadius: 8,
                    aspectRatio: 16 / 9,
                    width: '100%',
                  }}
                >
                  <Image
                    style={{ height: '100%' }}
                    source={{ uri: 'https://adi.or.id/images/berita/43.jpg' }}
                  />
                </View>
                <Text style={{ marginTop: 8, paddingHorizontal: 8 }}>
                  Call For Paper ABDI Jurnal Vol.2 No.1 Juni 2021
                </Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
        <Divider height={16} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
