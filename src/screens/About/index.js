import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const About = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef();

  const injectedScript = `
  document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sticky-nav').remove();
    document.getElementById('bottom-nav').remove();
    document.getElementById('footer').remove();
  });
  `;

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);
  };

  useBackHandler(() => {
    if (canGoBack) {
      webViewRef.current.goBack();
      return true;
    }

    return false;
  });

  return (
    <>
      <StatusBar translucent={false} backgroundColor={colors.background} />
      <WebView
        source={{ uri: 'https://bigboyz-blog.vercel.app/about' }}
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={injectedScript}
        bounces={false}
        originWhitelist={['https://*', 'http://*', 'gojek://*', 'shopeeid://*']}
        startInLoadingState
        renderLoading={() => (
          <ActivityIndicator
            style={[
              styles.loader,
              {
                backgroundColor: colors.background,
              },
            ]}
          />
        )}
        allowFileAccess
        domStorageEnabled
        javaScriptEnabled
        geolocationEnabled
        saveFormDataDisabled
        allowFileAccessFromFileURLS
        allowUniversalAccessFromFileURLs
        onNavigationStateChange={handleNavigationStateChange}
      />
    </>
  );
};

const styles = StyleSheet.create({
  loader: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
});

export default About;
