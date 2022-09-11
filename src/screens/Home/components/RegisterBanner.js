import { View, StyleSheet } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const RegisterBanner = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.background,
        bottom: 24,
        borderRadius: 8,
        elevation: 2,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 16,
        }}
      >
        Belum daftar anggota ADI?
      </Text>
      <Text style={{ marginBottom: 16, marginTop: 4 }}>
        Daftar sekarang untuk menikmati akses dan benefit lengkap dari ADI
      </Text>

      <Text
        style={{
          alignSelf: 'flex-end',
          color: colors.primary,
          paddingVertical: 4,
        }}
      >
        Daftar Sekarang
      </Text>
    </View>
  );
};

export default RegisterBanner;
