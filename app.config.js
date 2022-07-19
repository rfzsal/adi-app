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
      backgroundColor: '#5C6BC0',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      package: IS_DEV ? 'com.bigboyz.dev' : 'com.bigboyz',
      googleServicesFile: IS_DEV
        ? './google-services-dev.json'
        : './google-services.json',
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#5C6BC0',
      },
    },
    web: {
      favicon: './assets/favicon.png',
    },
    plugins: [
      '@react-native-firebase/app',
      '@react-native-google-signin/google-signin',
      '@notifee/react-native',
    ],
  },
};
