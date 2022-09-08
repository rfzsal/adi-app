import { View, StyleSheet } from 'react-native';
import {
  Text,
  Colors,
  Appbar,
  useTheme,
  TouchableRipple,
} from 'react-native-paper';

import Divider from '../../components/Divider';
import { useAuth } from '../../hooks/useAuth';
import Card from './components/Card';

const ViewCard = ({ navigation }) => {
  const auth = useAuth();
  const { colors } = useTheme();

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Kartu ADI" />
      </Appbar.Header>

      <Divider height={16} />

      <Card registered auth={auth} />

      <Divider height={8} />
      <Text style={{ textAlign: 'center' }}>
        Sentuh kartu untuk melihat lebih besar
      </Text>
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
              <Text style={styles.selectorButtonText}>Unduh</Text>
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
              <Text style={styles.selectorButtonText}>Bagikan</Text>
            </TouchableRipple>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  selectorButtonContainer: { flex: 1, borderWidth: 1, borderRadius: 8 },
  selectorButton: {
    paddingVertical: 16,
  },
  selectorButtonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ViewCard;
