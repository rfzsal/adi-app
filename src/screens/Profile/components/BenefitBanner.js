import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Text, Colors, useTheme } from 'react-native-paper';

const BenefitBanner = ({ onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.container}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            height: 64,
            width: 64,
            marginRight: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            resizeMode="center"
            style={{ height: 64, width: 64 }}
            source={require('../../../../assets/images/benefit.png')}
          />
        </View>
        <View style={{ bottom: 4 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 16 }}>
            Yuk, daftar menjadi anggota ADI sekarang!
          </Text>
          <Text style={{ color: Colors.grey600 }}>
            Nikmati akses dan benefit lengkap dari ADI
          </Text>
        </View>
      </View>

      <Text
        style={{
          textAlign: 'right',
          color: colors.primary,
          marginTop: 8,
        }}
      >
        Daftar sekarang
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16 },
});

export default BenefitBanner;

BenefitBanner.propTypes = {
  onPress: PropTypes.func,
};
