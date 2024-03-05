import React, {useEffect, useState} from 'react';
import RNFS from 'react-native-fs';
import epubjs from '~/components/Reader/epubjs';
import template from '~/components/Reader/template';
import WebView from 'react-native-webview';
import {View} from 'react-native';

export const Reader = ({}) => {
  const [templateEpub, setTemplateEpub] = useState<string | null>(null);
  const [templateUrl, setTemplateUrl] = useState<string | null>(null);
  const [initialLocations, setInitialLocations] = useState(false);
  useEffect(() => {
    (async () => {
      const epubjsFileUri = `${RNFS.DocumentDirectoryPath}epub.min.js`;
      console.log('epubjsFileUri', epubjsFileUri);
      setTemplateEpub(
        template.replace(
          /<script id="epubjs"><\/script>/,
          `<script src="${epubjsFileUri}"></script>`,
        ),
      );
      try {
        await RNFS.writeFile(epubjsFileUri, epubjs, 'utf8');
      } catch (e) {
        throw new Error('failed to write epubjs js file');
      }
    })();
  }, [initialLocations]);

  useEffect(() => {
    const saveTemplateFileToDoc = async () => {
      try {
        if (templateEpub) {
          const content = templateEpub;
          const fileUri = `${RNFS.DocumentDirectoryPath}index.html`;
          await RNFS.writeFile(fileUri, content, 'utf8');
          setTemplateUrl(fileUri);
        }
      } catch (error) {
        throw new Error('Error saving index.html file:');
      }
    };
    if (templateEpub) {
      saveTemplateFileToDoc();
    }
  }, [templateEpub]);

  return (
    <View style={{width: '100%', height: '100%'}}>
      {templateUrl && (
        <WebView
          source={{uri: templateUrl}}
          showsVerticalScrollIndicator={false}
          javaScriptEnabled
          originWhitelist={['*']}
          scrollEnabled={true}
          mixedContentMode="compatibility"
          allowUniversalAccessFromFileURLs
          allowFileAccessFromFileURLs
          allowFileAccess
          onShouldStartLoadWithRequest={(request) => {
            return true;
          }}
        />
      )}
    </View>
  );
};
