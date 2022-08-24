import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const TermsConditions = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef();

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

  useEffect(() => {
    const unsubscribe = setTimeout(() => {
      setIsLoaded(true);
    }, 500);

    return () => clearTimeout(unsubscribe);
  }, []);

  return (
    <>
      <StatusBar translucent={false} backgroundColor={colors.background} />
      {isLoaded && (
        <WebView
          source={{ uri: 'https://bigboyz-blog.vercel.app/terms-conditions' }}
          ref={webViewRef}
          bounces={false}
          originWhitelist={[
            'https://*',
            'http://*',
            'gojek://*',
            'shopeeid://*',
          ]}
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
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
});

export default TermsConditions;
