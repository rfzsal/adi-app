import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import Divider from '../../components/Divider';
import IconButton from './components/IconButton';
import NewsBox from './components/NewsBox';
import PromosCarousel from './components/PromosCarousel';

const Home = () => {
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
        <View style={{ backgroundColor: Colors.grey100 }}>
          <Divider height={8} />
        </View>
        <Divider height={16} />

        <View style={styles.headerContainer}>
          <Text style={styles.header}>Berita Terbaru</Text>
          <Text>Lihat Semua</Text>
        </View>

        <Divider height={24} />

        <View style={styles.newsContainer}>
          <NewsBox
            image="https://adi.or.id/images/berita/45.jpg"
            text="Diskusi Rutin Asosiasi Dosen Indonesia dengan Ikatan Ilmuan
                  Indonesia Internasional"
          />
          <Divider height={16} />
          <NewsBox
            image="https://adi.or.id/images/berita/44.jpg"
            text="Diskusi Rutin ADI dengan Indonesia Diaspora Network United"
          />
          <Divider height={16} />
        </View>
      </ScrollView>
    </SafeAreaView>
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
