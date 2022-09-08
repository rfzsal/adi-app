import { View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Colors, TouchableRipple } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import PromosCarousel from './components/PromosCarousel';

const Home = ({ route, navigation }) => {
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
