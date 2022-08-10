import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme, ActivityIndicator } from 'react-native-paper';
import { WebView } from 'react-native-webview';

const Blog = ({ route, navigation }) => {
  const { colors } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef();

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
          source={{ uri: 'https://bigboyz-blog.vercel.app/' }}
          ref={webViewRef}
          injectedJavaScriptBeforeContentLoaded={injectedScript}
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
          onMessage={(e) => {
            const data = e && e.nativeEvent.data ? e.nativeEvent.data : null;

            if (data === 'https://bigboyz-blog.vercel.app/') {
              return setCanGoBack(false);
            }

            if (data === 'https://bigboyz-blog.vercel.app/search') {
              return setCanGoBack(false);
            }

            setCanGoBack(true);
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  loader: { position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
});

export default Blog;
