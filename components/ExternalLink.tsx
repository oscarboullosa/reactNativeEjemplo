import { Link } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import { Platform } from 'react-native';

interface ExternalLinkProps extends React.ComponentProps<typeof Link> {
  href: string;
  title: string;
  url:string;
}

export function ExternalLink(props: ExternalLinkProps) {
  return (
    <Link
      hrefAttrs={{
        // On web, launch the link in a new tab.
        target: '_blank',
      }}
      {...props}
      onPress={(e) => {
        if (Platform.OS !== 'web') {
          // Prevent the default behavior of linking to the default browser on native.
          e.preventDefault();
          // Open the link in an in-app browser.
          WebBrowser.openBrowserAsync(props.url);
        }
      }}
    />
  );
}
