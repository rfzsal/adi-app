import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Appbar, useTheme } from 'react-native-paper';

import Divider from '../../components/Divider';
import { useUser } from '../../hooks/useUser';

const InputProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [university, setUniversity] = useState('');

  const user = useUser();
  const { colors } = useTheme();

  const handleSave = () => {
    if (name && university) {
      navigation.navigate('Checkout', { user: { name, university } });
    }
  };

  useEffect(() => {
    setName(user.name);
    setUniversity(user.university);
  }, []);

  return (
    <>
      <Appbar.Header style={{ backgroundColor: colors.background }}>
        <Appbar.BackAction onPress={navigation.goBack} />
        <Appbar.Content title="Daftar Anggota" />
      </Appbar.Header>

      <View style={styles.mainContainer}>
        <Divider height={16} />

        <Text>Nama</Text>
        <TextInput onChangeText={setName} value={name} mode="outlined" />
        <Divider height={16} />

        <Text>Universitas</Text>
        <TextInput
          onChangeText={setUniversity}
          value={university}
          mode="outlined"
        />
        <Divider height={16} />

        <Divider height={16} />

        <Button onPress={handleSave} mode="contained">
          Daftar Anggota
        </Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appbarMenuContainer: { paddingRight: 12 },
  appBarMenu: { paddingVertical: 4 },
  mainContainer: { paddingHorizontal: 16 },
  errorText: { fontSize: 12 },
  otherMethodText: { textAlign: 'center', paddingHorizontal: 8 },
  otherMethodTextContainer: { alignItems: 'center', bottom: 12 },
});

export default InputProfile;
