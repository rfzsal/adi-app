import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';

const Midtrans = ({ route, navigation }) => {
  const [statusBarColor, setStatusBarColor] = useState('#32ad4a');
  const [canGoBack, setCanGoBack] = useState(false);
  const { paymentLink } = route.params;
  const webViewRef = useRef();

  const injectedScript = `
    document.querySelector('#header > a.header-back').addEventListener('click', () => {
      if (window.location.href === '${paymentLink}#/order-summary') {
        window.location.href = '${paymentLink}#/order-summary?close';
      }
    });
    true;
  `;

  const handleNavigationStateChange = (navState) => {
    setCanGoBack(navState.canGoBack);

    if (navState.url.includes('?close')) {
      webViewRef.current.stopLoading();
      return navigation.goBack();
    }

    if (navState.url.includes('#/select-payment')) {
      webViewRef.current.stopLoading();
      return navigation.goBack();
    }

    if (navState.url.includes('#/406')) {
      webViewRef.current.stopLoading();
      return navigation.navigate('Transactions');
    }

    if (navState.url.includes('#/success')) {
      setStatusBarColor('#E8FBF7');
      setCanGoBack(false);
    }

    if (navState.url.includes('&transaction_status=pending')) {
      webViewRef.current.stopLoading();
      return navigation.navigate('Transactions');
    }

    if (navState.url.includes('?finish')) {
      webViewRef.current.stopLoading();
      return navigation.navigate('ViewCard');
    }

    if (navState.url.includes('&pin=654321')) {
      webViewRef.current.stopLoading();
      return navigation.navigate('ViewCard');
    }
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
      <StatusBar translucent={false} backgroundColor={statusBarColor} />
      <WebView
        source={{ uri: paymentLink }}
        ref={webViewRef}
        injectedJavaScript={injectedScript}
        bounces={false}
        originWhitelist={['https://*', 'http://*', 'gojek://*', 'shopeeid://*']}
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

export default Midtrans;
