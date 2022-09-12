const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'ADI (Dev)' : 'ADI',
    slug: 'adi',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#0277BD', // Blue
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: IS_DEV ? 'com.adi.dev' : 'com.adi',
      googleServicesFile: './google-services.json',
      versionCode: 1,
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-google-signin/google-signin',
      '@notifee/react-native',
      'expo-media-library',
      {
        isAccessMediaLocationEnabled: true,
      },
    ],
  },
};
