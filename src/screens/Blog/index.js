import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const Blog = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef();

  const isLoaded = useRef(true);

  const injectedScript = `
  document.addEventListener('DOMContentLoaded', () => {    
    let previousUrl = '';
    const observer = new MutationObserver(function(mutations) {
      if (location.href !== previousUrl) {
        previousUrl = location.href;
        window.ReactNativeWebView.postMessage(location.href)
      }
    });

    const config = {subtree: true, childList: true};
    observer.observe(document, config);
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

  const onLoadEnd = () => {
    setTimeout(() => {
      if (isLoaded.current) {
        setIsLoading(false);
      }
    }, 100);
  };

  useEffect(() => {
    return () => (isLoaded.current = false);
  }, []);

  return (
    <>
      <StatusBar translucent={false} backgroundColor={colors.background} />

      <WebView
        source={{ uri: 'https://bigboyz-blog.vercel.app' }}
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={injectedScript}
        bounces={false}
        originWhitelist={['https://*', 'http://*', 'gojek://*', 'shopeeid://*']}
        startInLoadingState
        onLoadEnd={onLoadEnd}
        allowFileAccess
        domStorageEnabled
        javaScriptEnabled
        geolocationEnabled
        saveFormDataDisabled
        allowFileAccessFromFileURLS
        allowUniversalAccessFromFileURLs
        onNavigationStateChange={handleNavigationStateChange}
        onMessage={(e) => {
          const data = e && e.nativeEvent.data ? e.nativeEvent.data : null;

          if (data !== 'https://bigboyz-blog.vercel.app/') {
            setCanGoBack(true);
          } else {
            setCanGoBack(false);
          }
        }}
      />
      {isLoading && (
        <View style={[styles.loader, { backgroundColor: colors.background }]}>
          <ActivityIndicator />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
  },
});

export default Blog;
