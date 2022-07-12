import { useBackHandler } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useRef } from 'react';
import { WebView } from 'react-native-webview';

const About = ({ route, navigation }) => {
  const [canGoBack, setCanGoBack] = useState(false);
  const webViewRef = useRef();

  const injectedScript = `
  document.addEventListener('DOMContentLoaded', () => {
    const topBar = document.getElementById('topbar');
    topBar.remove();

    const header = document.getElementById('branding');
    header.remove();

    const secondaryNav = document.querySelector(
      'nav.secondary-navigation.site-navigation'
    );
    secondaryNav.remove();

    const breadcrumb = document.querySelector(
      '#main div.breadcrumb-trail.breadcrumbs'
    );
    breadcrumb.remove();

    const postDate = document.querySelector('header.entry-header div.byline');
    postDate.remove();

    const footerMeta = document.querySelector('footer.entry-meta');
    footerMeta.remove();

    const authorCard = document.querySelector(
      'div.author-profile.clearfix.vcard'
    );
    authorCard.remove();

    const postNav = document.querySelector(
      'nav.pagination.post-pagination.clearfix'
    );
    postNav.remove();
    
    const comments = document.getElementById('comments');
    comments.remove();
    
    const footer = document.getElementById('footer');
    footer.remove();
    
    document.getElementById('tablepress-1868').remove();
    document.querySelector('div.ead-preview').remove();
    
    const pre = document.querySelectorAll('div.entry-content pre');
    pre[1].remove();
    pre[2].remove();
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
      <StatusBar translucent={false} />
      <WebView
        source={{ uri: 'https://timur.ilearning.me/2021/09/07/why-bigboyz/' }}
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={injectedScript}
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

export default About;
