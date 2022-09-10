import { View, StyleSheet, Image, ScrollView } from 'react-native';
import { Text, Colors, Appbar, useTheme, Button } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import Benefit from './components/Benefit';

const MemberStatus = ({ route, navigation }) => {
  const auth = useAuth();
  const { colors } = useTheme();
  const { registered } = route.params;

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Status Anggota" />
      </Appbar.Header>

      <ScrollView
        style={{ backgroundColor: colors.primary }}
        contentContainerStyle={[
          styles.mainContainer,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <Divider height={16} />

        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../../assets/images/member.png')}
          />
        </View>

        <Divider height={8} />

        {registered ? (
          <Text style={styles.header}>Kamu adalah anggota resmi ADI</Text>
        ) : (
          <Text style={styles.header}>
            Daftar menjadi anggota ADI sekarang!
          </Text>
        )}

        <Text style={[styles.subheader, { color: Colors.grey600 }]}>
          Nikmati layanan dan akses lengkap yang diberikan oleh ADI
        </Text>

        <Divider height={24} />

        <Benefit
          title="Diskon Penerbitan Artikel"
          subtitle="Dapat diskon untuk menerbitkan artikel pada ADI Journal"
          image={require('../../../assets/images/news.png')}
        />

        <Divider height={16} />

        <Benefit
          title="Mengikuti Seminar Gratis"
          subtitle="Dapat mengikuti seminar yang diselenggarakan oleh ADI secara
          gratis"
          image={require('../../../assets/images/seminar.png')}
        />

        <Divider height={16} />

        <Benefit
          title="Mengikuti Workshop Gratis"
          subtitle="Dapat mengikuti workshop yang diselenggarakan oleh ADI secara
          gratis"
          image={require('../../../assets/images/workshop.png')}
        />

        {registered && (
          <>
            <Divider height={32} />
            <Divider line />
            <Divider height={32} />

            <Text style={styles.header}>Status Keanggotaan</Text>

            <Divider height={16} />

            <View style={styles.container}>
              <Text style={styles.boldText}>Tanggal Aktif</Text>
              <Text
                style={[
                  styles.statusText,
                  { backgroundColor: Colors.green50, color: Colors.green800 },
                ]}
              >
                10 September 2022
              </Text>

              <Divider height={16} />

              <Text style={styles.boldText}>Tanggal Berakhir</Text>
              <Text
                style={[
                  styles.statusText,
                  {
                    backgroundColor: Colors.red50,
                    color: Colors.red800,
                  },
                ]}
              >
                10 September 2023
              </Text>

              <Divider height={16} />
            </View>
          </>
        )}

        {!registered && (
          <>
            <Divider height={32} />
            <View style={styles.container}>
              <Button
                onPress={() => {
                  if (auth.user) {
                    navigation.navigate('InputProfile');
                  } else {
                    navigation.navigate('Login');
                  }
                }}
                mode="contained"
              >
                Daftar Sekarang
              </Button>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: { borderTopRightRadius: 24, borderTopLeftRadius: 24, flex: 1 },
  container: { paddingHorizontal: 16 },
  imageContainer: {
    flex: 1,
    height: 160,
    maxHeight: 160,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },
  header: { fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  subheader: { textAlign: 'center' },
  boldText: { fontWeight: 'bold' },
  statusText: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 8,
    textAlign: 'center',
  },
});

export default MemberStatus;
