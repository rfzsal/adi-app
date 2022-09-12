import * as Clipboard from 'expo-clipboard';
import { shareAsync } from 'expo-sharing';
import { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import {
  Text,
  Colors,
  Appbar,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewShot from 'react-native-view-shot';

import Divider from '../../components/Divider';
import { useUser } from '../../hooks/useUser';
import Card from './components/Card';

const ViewCard = ({ route, navigation }) => {
  const user = useUser();
  const { colors } = useTheme();

  const ref = useRef();

  const registered = user?.ADIMember >= Date.now();

  const handleShare = async () => {
    try {
      const uri = await ref.current.capture();

      await shareAsync(uri);
    } catch (error) {
      return { error };
    }
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Kartu ADI" />
      </Appbar.Header>

      <View style={{ height: 16, backgroundColor: colors.primary }}>
        <View
          style={{
            borderTopRightRadius: 24,
            borderTopLeftRadius: 24,
            height: 16,
            backgroundColor: colors.background,
          }}
        />
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <ViewShot
          ref={ref}
          options={{ fileName: 'ADI', format: 'jpg', quality: 0.9 }}
        >
          <Card
            registered={registered}
            user={user}
            onPress={() => navigation.navigate('InputProfile')}
          />
        </ViewShot>
      </View>

      {/* <Divider height={8} />
      <Text style={{ textAlign: 'center' }}>
      Sentuh kartu untuk melihat lebih besar
    </Text> */}

      <Divider height={16} />

      <View style={{ paddingHorizontal: 16 }}>
        <View
          style={{
            borderWidth: 1,
            borderColor: Colors.grey200,
            backgroundColor: Colors.blue50,
            borderRadius: 8,
            paddingVertical: 4,
          }}
        >
          <View>
            <Text style={{ textAlign: 'center' }}>Nomor Anggota</Text>
            <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
              0123456
            </Text>
          </View>

          <TouchableOpacity
            onPress={async () => {
              try {
                await Clipboard.setStringAsync('0123456', {});
              } catch (error) {
                console.log(error);
              }
            }}
            activeOpacity={0.8}
            style={{
              height: 32,
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              right: 8,
              top: 4,
              bottom: 4,
            }}
          >
            <MaterialCommunityIcons
              color={Colors.grey800}
              name="content-copy"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Divider height={16} />

      <View style={{ flexDirection: 'row' }}>
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
              <View style={styles.selectorContainer}>
                <MaterialCommunityIcons
                  style={styles.selectorIcon}
                  color={Colors.grey800}
                  name="download-outline"
                  size={24}
                />
                <Text style={styles.selectorButtonText}>Unduh</Text>
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
              onPress={handleShare}
              style={styles.selectorButton}
            >
              <View style={styles.selectorContainer}>
                <MaterialCommunityIcons
                  style={styles.selectorIcon}
                  color={Colors.grey800}
                  name="share-variant-outline"
                  size={24}
                />
                <Text style={styles.selectorButtonText}>Bagikan</Text>
              </View>
            </TouchableRipple>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectorButtonContainer: { flex: 1, borderWidth: 1, borderRadius: 8 },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectorIcon: { marginRight: 8, top: 1 },
  selectorButton: {
    paddingVertical: 16,
  },
  selectorButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ViewCard;
