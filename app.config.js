const IS_DEV = process.env.APP_VARIANT === 'development';

export default {
  expo: {
    name: IS_DEV ? 'BigBoyz (Dev)' : 'BigBoyz',
    slug: 'bigboyz',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff', // White
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    android: {
      package: IS_DEV ? 'com.bigboyz.dev' : 'com.bigboyz',
      googleServicesFile: './google-services.json',
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-google-signin/google-signin',
      '@notifee/react-native',
    ],
  },
};
