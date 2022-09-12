import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const RegisterBanner = ({ onPress }) => {
  const { colors } = useTheme();

  return (
    <View
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        backgroundColor: colors.background,
        bottom: 24,
        borderRadius: 8,
        elevation: 2,
        paddingHorizontal: 16,
        paddingVertical: 8,
      }}
    >
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
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
      </TouchableOpacity>
    </View>
  );
};

export default RegisterBanner;
